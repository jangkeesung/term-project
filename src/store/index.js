import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    Username: null
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
