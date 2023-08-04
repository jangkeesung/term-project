import { createStore } from 'vuex';
import axios from 'axios';
export default createStore({
  state: {
    RecipeDTO: null,
    RecipeList: [],
    User: null
  },
  getters: {
  },
  mutations: {

    loginSuccess(state, userInfo) {
      if (userInfo != '' && userInfo != null) {
        state.User = userInfo;
      }
    }

  },
  actions: {
    getMemberInfo({ commit }) {
      let token = localStorage.getItem("access_token");
      let config = {
        headers: {
            "access-token": token
        }
      }
      axios.get('/term/login/users', config)
      .then(response => {
          let userInfo = response.data;
          console.log(userInfo);
          commit("loginSuccess", userInfo);
      });
    }
    
  },
  modules: {
  }
})
