import api from '../../gateway/api'
import router from '@/router'

const state = {
  campaign_list: [],
  campaign: {},
  campaign_result: {}
}

const actions = {
  getCampaignList: ({  commit, rootState }) => {
    api.get('campaign',{
      headers: {
        token:rootState.user.token
      }
    })
    .then(response => {
      commit('SET_CAMPAIGN_LIST', response.data.data)
    })
  },
  getCampaignById: ({  commit, rootState },campaign_id) => {
    api.get(`campaign/${campaign_id}`,{
      headers: {
        token:rootState.user.token
      }
    })
    .then(response => {
      commit('SET_CAMPAIGN', response.data.data)
    }).catch(error => {
      console.log(error)
      router.push({ path: '/404' })
      commit('SET_CAMPAIGN', {})
    })
  },
  getCampaignResultById: ({  commit, rootState },campaign_id) => {
    api.get(`campaign/${campaign_id}/result`,{
      headers: {
        token:rootState.user.token
      }
    })
    .then(response => {
      commit('SET_CAMPAIGN_RESULT', response.data.data)
    }).catch(error => {
      console.log(error)
      router.push({ path: '/404' })
      commit('SET_CAMPAIGN_RESULT', {})
    })
  }
}

// mutations
const mutations = {
  SET_CAMPAIGN_LIST: (state, data) => {
    state.campaign_list = data
  },
  SET_CAMPAIGN: (state, data) => {
    state.campaign = data
  },
  SET_CAMPAIGN_RESULT: (state, data) => {
    state.campaign_result = data
  }
}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
