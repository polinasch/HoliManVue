import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue,  BootstrapVueIcons, ButtonPlugin, TablePlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ButtonPlugin);
Vue.use(TablePlugin);
Vue.prototype.moment = moment;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')