import Vue from 'vue' // 从node_module查找
import App from './App'
import router from './router'
import 'common/stylus/index.styl' // 引入index.styl进来作为全局使用
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
