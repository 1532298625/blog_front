import { createStore } from 'vuex'


export default createStore({
  state: {
    user: undefined  || JSON.parse(localStorage.getItem('user')),
    keyword:'',
  },
  mutations: {
    setUserInfo(state, user) {
      state.user = user
    },
    setKeyWords(state, keyword) {
      state.keyword = keyword
    },
  },
  actions: {
  },
  modules: {
  },
  getters:{
    geKeyWord(){
      return state.keyword;
    }
  }
})
