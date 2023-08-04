import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.config.Vue.config.productionTip = false;
const app = createApp(App).use(store).use(router).mount('#app');
// app.beforeCreate(()=>{
    // this.$store.dispatch('getMemberInfo');
// });
// new Vue({
//     router,
//     store,

//     render: h => h(App)
// }).$mount("#app");