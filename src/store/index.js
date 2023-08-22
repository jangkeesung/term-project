import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    Username: null,
    bannerImg: '',
    bannerText: ''
  },
  getters: {
  },
  mutations: {

    loginSuccess(state, userInfo) {
      if (userInfo != '' && userInfo != null) {
        state.Username = userInfo.id;
        // console.log(state.User.id);
      }
    },
    loginFail(state , e) {
      state.Username == null;
      alert('로그인 오류: '+ e);
    },

    setBanner(state, banner) {
      state.bannerImg = banner.b_pic;
      state.bannerText = banner.b_content;
    }

  },
  actions: {
    async getMemberInfo({ commit }) {
      let token = localStorage.getItem("access_token");
      if (token) {
        let config = {
          headers: {
              "access-token": token
          }
        }
        await axios.get('/term/login/users', config)
        .then(response => {
          let userInfo = response.data;
          commit("loginSuccess", userInfo);
        }).catch((e)=>{
          commit('loginFail', e);
        });
      }
    },
    async getBanner({commit}) {
      await axios.get('/term/get-banner')
      .then((response)=>{
        let banner = response.data
        commit('setBanner', banner);
      })
      .catch( e => console.error(e) );
    }

  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ["store"]
    })
  ]
})
