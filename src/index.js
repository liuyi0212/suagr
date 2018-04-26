import Vue from 'vue';
import Mint from 'mint-ui';
import wxJSDSK from 'weixin-js-sdk';
import './app.css';
import 'mint-ui/lib/style.css';
import router from './router';
import App from './app';

Vue.use(Mint);
window.wx = wxJSDSK;
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
