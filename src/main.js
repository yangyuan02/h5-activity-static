
import Vue from 'vue'
import Application from './App'
import app from '@/widget/app'
import router from './router'
import store from './store'
import utils from '@/widget/utils'
import filter from '@/filters'
import Toast from '@/components/toast'
import loading from '@/components/loading'
import pageLoading from '@/components/pageLoading'
import showModal from '@/components/showModal'
import { sendTracker } from '@/widget/tracker'

Vue.use(showModal)
Vue.use(loading)
Vue.use(pageLoading)
Vue.use(Toast)

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

const setHeader = () => {
  const hideHead = utils.query('hideHead')
  if (utils.isApp()) {
    if (hideHead == 0 && utils.getVersion() < 5320) {
      app.postMessage('hiddenHead',{'isHidden':'1'})
      document.body.style.paddingTop = '.88rem'
    } else {
      app.postMessage('hiddenHead',{'isHidden':'0'})
      document.body.style.paddingTop = 0
    } 
  } else if (utils.weixin() || utils.nativeQQ()){
    document.body.style.paddingTop = 0
  } 
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const bgColor = to.meta.bgColor
  const shareConfig = to.meta.shareConfig
  const trackerConfig = to.meta.trackerConfig
  setHeader()
  if (bgColor) {
    document.body.style.backgroundColor = bgColor
  } else {
    document.body.style.backgroundColor = '#f5f5f5'
  }
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    process.env.NODE_ENV != 'develop'
  ) {
    //判断用户已经登录
    if (utils.loggedIn()) {
      next()
      if (shareConfig) {
        app.setShareContent(shareConfig)
      }
      sendTracker(trackerConfig)
    } else {
      if (utils.isApp()) {
        utils.login()
      } else {
        const from = to.fullPath
        location.href = `/login.html?from=` + encodeURIComponent(from)
      }
    }
  } else {
    next()
    if (shareConfig) {
      app.setShareContent(shareConfig)
    }
    sendTracker(trackerConfig)
  }
})

new Vue({
  el: '#app',
  router,
	store,
  components: { Application },
  template: '<Application/>'
})
