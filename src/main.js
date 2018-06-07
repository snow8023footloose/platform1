// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import {request} from 'api/api'
import {urlColletion} from 'api/api'
import {getUID} from 'api/api'
import {goodsArr} from 'api/api'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$request = request
Vue.prototype.url = urlColletion()
Vue.prototype.getUID = getUID
Vue.prototype.goodsArr = goodsArr

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
