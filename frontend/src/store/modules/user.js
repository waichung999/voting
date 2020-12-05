import api from '../../gateway/api'
import router from '@/router'

const state = {
  token: '',
  vote_record:[]
}

const actions = {
  verification: (state,hkid) => {
    api.post('user/verification', {
      hkid: hkid
    }).then(response => {
      if (response.data.success === true) {
        state.commit('SET_TOKEN', response.data.data)
        router.push('campaign')
      } else {
        alert(response.data.message)
      }
    }).catch(error => {
      console.log(error)
      alert(error)
    })
  },
  vote: ({ rootState },payload) => {
    api.post('user/vote', payload
    ,{ headers: {
      token:rootState.user.token
    }}).then(response => {
      if (response.data.success === true) {
        alert(response.data.message)
        router.push(`/campaign`)
      } else {
        alert(response.data.message)
      }
    }).catch(error => {
      console.log(error)
      alert(error)
    })
  },
  getVoteRecord: ({ commit,rootState }) => {
    api.get('user/voteRecord',{
      headers: {
        token:rootState.user.token
      }
    }).then(response => {
      if (response.data.success === true) {
        commit('SET_VOTE_RECORD', response.data.data)
      } else {
        alert(response.data.message)
      }
    }).catch(error => {
      console.log(error)
      alert(error)
    })
  }
}

// mutations
const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data.token
  },
  SET_VOTE_RECORD: (state, data) => {
    state.vote_record = data
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
