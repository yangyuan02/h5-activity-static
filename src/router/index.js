import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

const PageError = r => require.ensure([], () => r(require('@/views/activity/error/404.vue')),'PageError')

const redPackInvite = r => require.ensure([], () => r(require('@/views/activity/redpack/invite.vue')),'redPackInvite')

const redPackInvalid = r => require.ensure([], () => r(require('@/views/activity/redpack/invalid.vue')),'redPackInvalid')

const redPackStart = r => require.ensure([], () => r(require('@/views/activity/redpack/start.vue')),'redPackStart')

const redPackReceive = r => require.ensure([], () => r(require('@/views/activity/redpack/receive.vue')),'redPackReceive')

const redPakFinished =  r => require.ensure([], () => r(require('@/views/activity/redpack/finished.vue')),'redPakFinished')

const redPackSuccess = r => require.ensure([], () =>  r(require('@/views/activity/redpack/success.vue')),'redPackSuccess')

const redPackStop = r => require.ensure([], () =>  r(require('@/views/activity/redpack/stop.vue')),'redPackStop')

const worldCupPrize = r => require.ensure([], () =>  r(require('@/views/activity/worldcup/prize.vue')),'worldCupPrize')

const worldCupAllTeam = r => require.ensure([], () =>  r(require('@/views/activity/worldcup/allteam.vue')),'worldCupAllTeam')

const makeMoney = r => require.ensure([], () =>  r(require('@/views/activity/make/money.vue')),'makeMoney')

const couponList = r => require.ensure([], () =>  r(require('@/views/activity/coupon/list.vue')),'couponList')

export default new Router({
  mode:'history',
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: PageError,
      meta: {
        title: '找不到页面'
      }
    },{
      path: '/activity/redpack/invite',
      name: 'redPackInvite',
      component: redPackInvite,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/receive',
      name: 'redPackReceive',
      component: redPackReceive,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/start',
      name: 'redPackStart',
      component: redPackStart,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/finished',
      name: 'redPakFinished',
      component: redPakFinished,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/success',
      name: 'redPackSuccess',
      component: redPackSuccess,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/stop',
      name: 'redPackStop',
      component: redPackStop,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/invalid',
      name: 'redPackInvalid',
      component: redPackInvalid,
      meta: {
        title: '拆红包'
      }
    },{
  	  path: '/activity/worldcup/prize',
			name: 'worldCupPrize',
			component: worldCupPrize,
			meta: {
  	  	title: '我的奖品',
        requireLogin: true
			}
		},{
      path: '/activity/worldcup/allteam',
      name: 'worldCupAllTeam',
      component: worldCupAllTeam,
      meta: {
        title: '我的球队',
        requireLogin: true
      }
    },{
      path: '/activity/make/money',
      name: 'makeMoney',
      component: makeMoney,
      meta: {
        title: '伊起赚专区'
      }
    },{
      path: '/activity/coupon/list',
      name: 'couponList',
      component: couponList,
      meta: {
        title: '领券专区'
      }
    }
  ]
})
