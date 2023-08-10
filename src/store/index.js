import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    User: null
  },
  getters: {
  },
  mutations: {

    loginSuccess(state, userInfo) {
      if (userInfo != '' && userInfo != null) {
        state.User = userInfo;
        console.log(state.User.id);
      }
    },
    loginFail(state) {
      state.User == null;
    }

  },
  actions: {
    getMemberInfo({ commit }) {
      let token = localStorage.getItem("access_token");
      if (token) {
        let config = {
          headers: {
              "access-token": token
          }
        }
        axios.get('/term/login/users', config)
        .then(response => {
            let userInfo = response.data;
            //console.log(userInfo);
            commit("loginSuccess", userInfo);
        }).catch(()=>{
          commit('loginFail');
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
