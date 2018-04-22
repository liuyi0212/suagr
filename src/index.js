import Vue from 'vue';
import Mint from 'mint-ui';
import './app.css';
import 'mint-ui/lib/style.css';
import router from './router';
import App from './app';

Vue.use(Mint);

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
