import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BaiduMap from 'vue-baidu-map';
import requireContext from './assets/js/requirecontext';
import VConsole from 'vconsole';

var vConsole = new VConsole();
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'LE3x8qkRHBy9fOf4zj0KBfxhvVP4c6LX',
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
