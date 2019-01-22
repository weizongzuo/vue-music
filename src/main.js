import 'babel-polyfill' // 使用polyfill，需要在程序入口的顶部引入它，以确保首先加载其首先加载  这样就确保在尚未支持一些es6函数、方法的浏览器使用es6语法
import Vue from 'vue' // 从node_module查找
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
/* eslint-disable no-new */
import fastclick from 'fastclick' // 引入index.styl进来作为全局使用
Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
new Vue({
  el: '#app',
  router, // 注入路由
  store, // 注入store
  render: h => h(App)
})
