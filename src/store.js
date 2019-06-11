import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    installPrompt: null
  },
  getters:{
    canInstall(state){
      return 'BeforeInstallPromptEvent' in window &&
              state.installPrompt instanceof BeforeInstallPromptEvent;
    }
  },
  mutations:{
    setInstallPrompt(state, data){
      state.installPrompt = data;
    }
  }
})