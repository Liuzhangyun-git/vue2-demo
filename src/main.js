import Vue from 'vue';

import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
Vue.use(Antd);
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
