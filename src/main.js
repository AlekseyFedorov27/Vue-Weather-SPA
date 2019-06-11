import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './routes'
import store from './store'

import VCharts from 'v-charts'

Vue.use(VCharts)
import './assets/materialize-src-v1.0.0/materialize.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

navigator.serviceWorker.register('/service-worker.js');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  store.commit('setInstallPrompt', e);
});