<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="redpack-bg" v-if="redpackImage" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-view">
        <div class="redpack-content">
          <div class="start-tips">
            <h4 class="c3">还有<strong>{{showCountTime}}</strong>即将失效</h4>
            <p class="c3" v-for="(item) in friendCouponList"><b>{{item.hideMobile}}</b>已帮您拆红包</p>
            <p class="c3" v-if="needHelpCount">还需{{needHelpCount}}位好友</p>
          </div>
          <div class="redpack-share-btn start-share-btn" id="share_copy"
               v-clipboard:copy="shareConfig.url"
               v-clipboard:success="weixinShare"
               v-clipboard:error="onError">
            <span>立即分享</span>
          </div>
        </div>
        <RedPackRule></RedPackRule>
        <div class="redpack-view-bg1"></div>
        <div class="redpack-view-bg2">
          <span></span>
        </div>
      </div>
	    <UIShare></UIShare>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import UIShare from '@/components/widget/ui-share'
  import RedPackRule from '@/components/redpack/rule'
  import utils from '@/widget/utils'
  import config from '@/config/index'
  import app from '@/widget/app'
  import * as Model from '@/model/redpack'
  import {mapGetters, mapActions} from 'vuex'
  import wx_share from './weixin_share'
  import { getSystemTimes, countTime, linkInfo } from './common'
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'

  Vue.use(VueClipboard)

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        redpackImage: config.staticPath + '/activity-static/images/redpack_invite_bg.jpg?v=' + config.getTime,
        friendCouponList: [],
        overTime: '',
        showCountTime: '',
        countTimer:  null,
        needHelpCount: 0,
        shareConfig: {},
        pageView: false
      }
    },
    components: {
      AppHeader,
      UIShare,
      RedPackRule
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    created () {
      this.shareConfig = wx_share.shareConfig.call(this)
      this.$showLoading()
      Promise.all([
        this.getRedPackDetail(),
        this.getSystemTimes()
      ]).then((result) => {
        this.pageView = true
        const activityTimes = result[0]
        const serverTimes = result[1]
        this.$hideLoading()
        if (activityTimes) {
          this.startShowCountTime(activityTimes,serverTimes)
        } else {
          this.showCountTime = '00:00:00'
        }
      })
    },
    methods: {
      ...mapActions([
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      backAction () {
        const returnurl = this.$route.query.returnurl
        if (utils.isApp()) {
          app.back('refresh','forceBack')
        } else {
          if (returnurl) {
            location.replace(returnurl)
          } else {
            location.href = '/index.html'
          }
        }
      },
      /**
       * 显示倒计时时间
       */
      startShowCountTime (activityTimes,serverTimes) {
        const showCountTime = countTime(activityTimes,serverTimes)
        this.showCountTime = showCountTime

        if (countTime(activityTimes,serverTimes) <= 0) {
          clearInterval(this.countTimer)
          this.showCountTime = '00:00:00'
          return
        }

        this.countTimer = setInterval(() => {
          serverTimes += 1000 * 1
          const showCountTimeStr =  countTime(activityTimes,serverTimes)
          this.showCountTime = showCountTimeStr == -1 ? '00:00:00' : showCountTimeStr
        },1000)
      },
      getSystemTimes () {
        return getSystemTimes.call(this)
      },
      getRedPackDetail () {
        const { redpackCode } = this.$route.query

        return Model.getRedPackDetail({
          type: 'POST',
          data: {
            shareCode: redpackCode
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {
            const {
              activityStatus,
              overTime,
              needHelpCount,
              friendCouponList,
              role
            } = data

            this.needHelpCount = needHelpCount
            this.overTime = overTime
            this.friendCouponList = friendCouponList
            const searchPrams = location.search

            if (role == 2) {
              this.pageAction('/activity/redpack/receive'+ searchPrams)
            } else {
              if (activityStatus == 1) {
                this.pageAction('/activity/redpack/invalid' + searchPrams)
              } else if (activityStatus == 2) {
                this.pageAction('/activity/redpack/finished' + searchPrams)
              } else if (activityStatus == 3) {
                this.pageAction('/activity/redpack/success' + searchPrams)
              } else if (activityStatus == 4) {
                this.pageAction('/activity/redpack/stop' + searchPrams)
              } else if (activityStatus == 5) {
                this.pageAction('/activity/redpack/invalid' + searchPrams)
              }
            }
            return data.overTime

          } else {
            this.$toast(result.message)
          }

        })
      },
      pageAction (url) {
        this.$router.replace(url)
      },
      getRedPackCode () {
        const { orderCode } = this.$route.query
        if (!orderCode) {
          this.$toast('获取分享失败订单号缺失')
          return
        }
        return Model.getRedPackCode({
          type: 'POST',
          data: {
            orderCode
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0) {
            this.redpackCode = data.shareCode
            this.shareConfig = wx_share.shareConfig.call(this)
            return data
          } else {
            this.$toast(result.message)
          }

        })
      },
      copyShare () {
        if (!utils.weixin() && !utils.isApp()) {
          this.$toast('链接已复制到粘贴板')
        }
      },
      onError () {
        this.$toast('链接复制失败')
      },
      weixinShare () {
        const {redpackCode, orderCode} = this.$route.query
        if (redpackCode) {
          wx_share.weixinShare.call(this)
          this.copyShare()
        } else {
          if (!orderCode) {
            this.$toast('获取分享失败订单号缺失')
            return
          }
          this.getRedPackCode().then((data) => {
            if (data) {
              wx_share.weixinShare.call(this)
              this.copyShare()
            }
          })
        }
      }
    },
    beforeDestroy () {
      if (this.countTimer) {
        clearInterval(this.countTimer)
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/common.scss';
  .start-content{
    margin: -.24rem .28rem 0;
    padding: 0 .48rem .6rem;
    background: #fff;
  }

  .start-share-btn{
    margin-top: .3rem;
  }
  .start-tips{
    font-size: .36rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    p{
      font-size: .28rem;
      b{
        font-weight: bold;
      }
    }
    h4{
      padding-bottom: .45rem;
      strong{
        color:#d20505;
        padding: 0 .15rem;
      }
    }
  }

</style>
