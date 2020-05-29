import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueFirestore from 'vue-firestore'

Vue.config.productionTip = false

Vue.use(VueFirestore)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
