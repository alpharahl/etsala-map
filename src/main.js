import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

import firebase from 'firebase';

const firebaseConfig = require('../firebase.conf.json');
firebase.initializeApp(firebaseConfig);
Vue.prototype.$user = null;

Vue.use(require('vue-moment'))

new Vue({
  render: h => h(App),
}).$mount('#app')
