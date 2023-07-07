import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.scss'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$path = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')