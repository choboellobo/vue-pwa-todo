// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Rxjs
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
Vue.use(VueRx, Rx)
// LocalStorage
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

// Materialize
import materialize from 'materialize-css';
Vue.prototype.$materialize = materialize;
// Moment
import moment from 'moment'
Vue.prototype.$moment = moment
// Firebase
import firebase from 'firebase'
import firebaseConfig from './firebase.config'
firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase;

//Bus event
const bus = new Vue()
Vue.prototype.$bus = bus;

// Vuex
import {store} from './store/store';

// Components
import Components from './components'
Vue.use(Components)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
