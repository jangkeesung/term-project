import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  state: {
    Username: null,
    m_tel: null,
    m_name: null,
    bannerImg: '',
    bannerURL: '',
    s_col: '',
    s_word: '',
    rownum: 8
  },
  getters: {
  },
  mutations: {

    loginSuccess(state, dto) {
      if (dto.id != '' && dto.id != null) {
        state.Username = dto.id;
        state.m_tel = dto.tel;
        state.m_name = dto.name;
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
      state.bannerURL = banner.b_content;
    },
  
    setColWord(state, item) {
      state.s_col = item.s_col;
      state.s_word = item.s_word;
    }

  },
  actions: {
    async getMemberInfo({ commit }) {
      let token = localStorage.getItem("access_token");
      if (token) {
        let config = {
          headers: {
            "Authorization": "Bearer " + token
          },
        }
        await axios.get('/term/login/users', config)
        .then(response => {
          if (response.data.id == 'ExpiredJwt Please Retry Login') {

            //토큰 만료
            localStorage.removeItem("access_token");
            commit("removeUser");
            return false;

          } else if (response.data.id == 'tokenAccessError') {

            //토큰 에러
            alert('잘못된 토큰입니다.');
            localStorage.removeItem("access_token");
            commit("removeUser");
            return false;

          } else {
            //로그인 성공 시
            let dto = {
              id: response.data.id,
              tel: response.data.tel,
              name: response.data.name
            }

            commit("loginSuccess", dto);
            //새로 받은 토큰으로 덮어 씌우기
            let token = response.data.token;
            localStorage.setItem('access_token', token);
            
          }
        }).catch((e)=>{
          commit('loginFail', e);
        });
      } else {
        commit("removeUser");
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
    createPersistedState()
  ]
})
