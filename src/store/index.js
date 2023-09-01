import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    Username: null,
    bannerImg: '',
    bannerText: '',
    s_col: 'r_subject',
    s_word: ''
  },
  getters: {
  },
  mutations: {

    loginSuccess(state, userId) {
      if (userId != '' && userId != null) {
        state.Username = userId;
        // console.log(state.User.id);
      }
    },
    loginFail(state , e) {
      state.Username == null;
      alert('로그인 오류: '+ e);
    },
    removeUser(state) {
      state.Username = null;
    },

    setBanner(state, banner) {
      state.bannerImg = banner.b_pic;
      state.bannerText = banner.b_content;
    },
  
    setColWord(state, item) {
      state.s_col = item.s_col;
      state.s_word = item.s_word;
    }

  },
  actions: {
    async getMemberInfo({ commit }) {
      let token = sessionStorage.getItem("access_token");
      if (token) {
        let config = {
          headers: {
              "access-token": token
          }
        }
        await axios.get('/term/login/users', config)
        .then(response => {
          // console.log(response.data);
          if (response.data.id == 'ExpiredJwt Please Retry Login') {
            alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
            sessionStorage.removeItem("access_token");
            commit("removeUser");
          } else if (response.data.id == 'tokenAccessError') {
            alert('잘못된 토큰입니다.');
            sessionStorage.removeItem("access_token");
            commit("removeUser");
          } else {
            let userId = response.data.id;
            commit("loginSuccess", userId);
            //새로 받은 토큰으로 덮어 씌우기
            let token = response.data.token;
            sessionStorage.setItem('access_token', token);
          }
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
    },

  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ["store"]
    })
  ]
})
