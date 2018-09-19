
import Vue from 'vue'

import Application from './App'

import app from '@/widget/app'

import router from './router'

import store from './store'

import utils from '@/widget/utils'

import filter from '@/filters'

import Toast from '@/components/toast'

import showLoading from '@/components/loading'

import pageLoading from '@/components/pageLoading'

import showModal from '@/components/showModal'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use(showModal)

Vue.use(showLoading)

Vue.use(pageLoading)

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

Vue.use(Toast,{    //支持全局配置
	duration: "1500"
})

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    window.FastClick.attach(document.body)
  }, false)
}

router.beforeEach((to, from, next) => {

  document.title = to.meta.title

  if (to.matched.some(record => record.meta.requireLogin) && process.env.NODE_ENV != 'develop') {

    //判断用户已经登录
    if (app.loggedIn()) {
      next()

    } else {

      if (utils.isApp()) {

        app.login()
        next()

      } else {

        const from = utils.getRelatedUrl()

        window.location.href = `/login.html?from=` + encodeURIComponent(from)
      }
    }

  } else {
    next()
  }
})


new Vue({
  el: '#app',
  router,
	store,
  components: { Application },
  template: '<Application/>'
})
