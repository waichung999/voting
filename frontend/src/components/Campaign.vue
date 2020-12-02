<template>
  <v-container>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
          cols="12"
          md="12"
          >{{campaign.name}}</v-col>
          <v-col
          cols="12"
          md="12"
          v-if="voted"
          ><span class="font-red">你已投票了</span></v-col>
          <v-col
          cols="12"
          md="12"
          ><v-radio-group v-model="selectedOption">
            <v-radio
            :disabled="voted"
            v-for="(index,key) in campaign.vote_options"
            :key="key"
            :label="`${index.option_name}`"
            :value="index.id"
            ></v-radio>
          </v-radio-group>
          <v-btn
          color="success"
          class="mr-4"
          @click="vote">
          提交</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</v-container>
</template>

<script>

export default {
  name: 'Campaign',
  data:function () {
    return {
      valid:true,
      selected_option:this.selectedOption
    }
  },
  computed: {
    selectedOption: {
      get(){
        return this.$store.state.campaign.campaign.voted_id
      },
      set(value){
        this.selected_option = value
      }
    },
    voted(){
      return (typeof this.selectedOption === "number" ? true : false)
    },
    campaign() {
      return this.$store.state.campaign.campaign;
    }
  },
  methods: {
    getCampaignById (campaign_id) {
      this.$store.dispatch('getCampaignById',campaign_id)
    },
    vote(){
      this.$store.dispatch('vote',{option_id:this.selected_option,campaign_id:this.$route.params.id})
    }
  },
  mounted: function() {
    this.getCampaignById(this.$route.params.id)

  },
  created: function() {
  }
}
</script>
<style>
.font-red{
  color: red
}
</style>
