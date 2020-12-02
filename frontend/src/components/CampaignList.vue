<template>
  <v-container>
    <p><b>投票記錄</b></p>
    <ul>
      <li v-for="(campaign,key) in vote_record.campaigns" :key="key">
        <p><b>{{campaign.name}}</b></p>
        <p :key="vote_options_key" v-for="(vote_option,vote_options_key) in campaign.vote_options">
          {{vote_option.option_name}}
          -{{(vote_option.user_votes.length > 0 ? vote_option.user_votes[0].count :'0')}} 票
          {{(vote_option.id == campaign.user_vote.option_id ? '(你的選擇)':'')}}
        </p>
      </li>
    </ul>
    <v-data-table
    :headers="headers"
    :items="campaign_list"
    :items-per-page="5"
    class="elevation-1"
    @click:row="selectCampaign"
    >
    <template v-slot:item.name="{ item }">
      <span>{{item.name}} {{isExpire(item.end_time)}}</span>
    </template>
    <template v-slot:item.start_time="{ item }">
      <span>{{$moment(item.start_time).format('YYYY-MM-DD hh:mm:ss')}}</span>
    </template>
    <template v-slot:item.end_time="{ item }">
      <span>{{$moment(item.end_time).format('YYYY-MM-DD hh:mm:ss')}}</span>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
import router from '@/router'

export default {
  name: 'CampaignList',

  data:function () {
    return {
      headers: [
        { text: '投票名稱', align: 'start', sortable: false, value: 'name'},
        { text: '開始時間', value: 'start_time' },
        { text: '結束時間', value: 'end_time' }
      ]
    }
  },
  computed: {
    campaign_list() {
      return this.$store.state.campaign.campaign_list;
    },
    vote_record() {
      return this.$store.state.user.vote_record;
    }
  },
  methods: {
    isExpire(end_time){
      if(this.$moment().isAfter(this.$moment(end_time)))
      return '(已完結)'
    },
    selectCampaign(campaign){
      if(this.$moment().isAfter(this.$moment(campaign.end_time))) {
        router.push(`campaign/${campaign.id}/result`)
      } else {
        router.push(`campaign/${campaign.id}`)
      }
    },
    getCampaignList() {
      this.$store.dispatch('getCampaignList')
    },
    getVoteRecord() {
      this.$store.dispatch('getVoteRecord')
    }
  },
  mounted: function() {
    this.getCampaignList()
    this.getVoteRecord()
  }
}
</script>
