import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/reset.less'
import '@/assets/icon/iconfont.css'
// 适配
import 'amfe-flexible'

// vant组件全部引入
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.less'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'uoKC3AAr62H3u5HuQEbsbCg8kiEw7oCh'
})

Vue.use(Lazyload)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
