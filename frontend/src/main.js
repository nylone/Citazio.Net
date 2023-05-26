import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import { ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'



Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)
Vue.prototype.$user = ref("")
Vue.prototype.$path = window.location.protocol + "//" + window.location.hostname + ":3000"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')