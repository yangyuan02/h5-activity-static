<template>
  <div class="pageView">
    <AppHeader :title="title" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper koi-end-view" :class="{'visibility': pageView}">
      <div class="koi-end">
        <img src="./images/koi_end.png"/>
        <h4>翻倍锦鲤券活动结束啦～</h4>
        <p class="font-b cfff">{{times}} 秒后自动跳转到首页</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .koi-end-view{
    background: #bd0004;
  }
  .koi-end{
    padding-top: .46rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 2.88rem;
      height: 2.88rem;
    }
    h4{
      font-size: .36rem;
      color: #fff;
      padding-top: .32rem;
    }
  }

</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

  export default {
    data () {
      return {
        title: '翻倍锦鲤券',
        pageView: true,
        times: 3,
        timer: null
      }
    },
    components: {
      AppHeader
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back('refresh','forceBack')
        } else {
          location.href = '/index.html'
        }
      }
    },
    created () {
      let times = 3
      this.timer = setInterval(() => {
        times--
        if (times > 0) {
          this.times = times
        } else {
          if (utils.isApp()) {
            app.back('refresh','forceBack')
          } else {
            location.href = '/index.html'
          }
          clearInterval(this.timer)
        }
      },1000)
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }

</script>
