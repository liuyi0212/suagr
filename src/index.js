import Vue from 'vue';
import Mint from 'mint-ui';
import wxJSDSK from 'weixin-js-sdk';
import router from './router';
import './css/base.css';
import './css/common.less';
import App from './app';
import 'mint-ui/lib/style.css';

window.wx = wxJSDSK;
Vue.use(Mint);
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
