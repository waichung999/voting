<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col
        cols="12"
        md="12"
        >投票結果：{{campaign_result.name}}</v-col>
        <v-col
        cols="12"
        md="12"
        >
        <ul>
          <li v-for="(vote_option,key) in campaign_result.vote_options" :key="key">{{vote_option.option_name}} -
            {{(vote_option.user_votes.length > 0 ? vote_option.user_votes[0].count :'0')}}票</li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</v-container>
</template>

<script>

export default {
  name: 'CampaignResult',
  data:function () {
    return {

    }
  },
  computed: {
    campaign_result() {
      return this.$store.state.campaign.campaign_result;
    }
  },
  methods: {
    getCampaignResultById (campaign_id) {
      this.$store.dispatch('getCampaignResultById',campaign_id)
    },
  },
  mounted: function() {
    this.getCampaignResultById(this.$route.params.id)
  }
}
</script>
<style>
.font-red{
  color: red
}
</style>
