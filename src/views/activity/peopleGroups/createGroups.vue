<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
    <!-- 第一部分 -->
    <div class="cg_first_section">
      <div class="fc_detail">
        <p class="detail_information detail_1">{{totalAmount}}</p>
        <p class="detail_information detail_2">累计收益</p>
        <p class="detail_information detail_3" @click="jumpPage">收益金明细</p>
      </div>
    </div>
    <!-- 第一部分结束 -->

    <!-- 导航条开始 -->
    <div class="cg_navigation">
      <div class="navigation_left" @click="pickItem(1)">
        <div class="na_left_text" :class="{'na_text': pick}">
          团购商品
        </div>
        <div class="na_left_style" :class="{'na_tyle': pick}">
        </div>
      </div>
      <div class="navigation_right" @click="pickItem(2)">
        <div class="na_right_text" :class="{'na_text': !pick}">
          我的团购
        </div>
        <div class="na_right_style" :class="{'na_tyle': !pick}">
        </div>
      </div>
    </div>
    <!-- 导航条结束 -->
    <!--  商品部分开始-->
    <div class="cg_second_section">
      <div class="cg_second_section_bg">

      </div>

      <div class="cg_second_section_body" v-show="firstSection">

        <div class="cg_ss_body_title">
          <span class="cg_ss_title1">团购商品</span>
          <span class="cg_ss_title2">分享越多收益越多</span>
        </div>
        <!-- 无数据时显示 -->
        <div class="nogoods-style1" v-show="myGroupsInt">
          <div class="nogoods-style1-img">
          </div>
          <p class="nogoods-style1-text1">暂无团购商品</p>

        </div>
        <!-- 骨架部分 -->
        <div class="cg_structure_body" v-show="skeleton">
          <div class="cg_structure">
            <div class="structure_content">
              <div class="stru_content_left">
              </div>
              <div class="stru_content_right">
                <div class="structure_right_top">
                  <div class="structure_right1">
                  </div>
                  <div class="structure_right2">
                  </div>
                  <div class="structure_right3">
                  </div>
                </div>

                <div class="structure_right_bottom">
                  <div class="structure_right4_left">
                  </div>
                  <div class="structure_right4_right">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div class="cg_structure_body" v-show="skeleton">
          <div class="cg_structure">
            <div class="structure_content">
              <div class="stru_content_left">
              </div>
              <div class="stru_content_right">
                <div class="structure_right_top">
                  <div class="structure_right1">
                  </div>
                  <div class="structure_right2">
                  </div>
                  <div class="structure_right3">
                  </div>
                </div>

                <div class="structure_right_bottom">
                  <div class="structure_right4_left">
                  </div>
                  <div class="structure_right4_right">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cg_structure_body" v-show="skeleton">
          <div class="cg_structure">
            <div class="structure_content">
              <div class="stru_content_left">
              </div>
              <div class="stru_content_right">
                <div class="structure_right_top">
                  <div class="structure_right1">
                  </div>
                  <div class="structure_right2">
                  </div>
                  <div class="structure_right3">
                  </div>
                </div>

                <div class="structure_right_bottom">
                  <div class="structure_right4_left">
                  </div>
                  <div class="structure_right4_right">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>




        <div class="cg_structure_body" v-show="skeleton">
          <div class="cg_structure">
            <div class="structure_content">
              <div class="stru_content_left">
              </div>
              <div class="stru_content_right">
                <div class="structure_right_top">
                  <div class="structure_right1">
                  </div>
                  <div class="structure_right2">
                  </div>
                  <div class="structure_right3">
                  </div>
                </div>

                <div class="structure_right_bottom">
                  <div class="structure_right4_left">
                  </div>
                  <div class="structure_right4_right">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="cg_structure_body" v-show="skeleton">
          <div class="cg_structure">
            <div class="structure_content">
              <div class="stru_content_left">
              </div>
              <div class="stru_content_right">
                <div class="structure_right_top">
                  <div class="structure_right1">
                  </div>
                  <div class="structure_right2">
                  </div>
                  <div class="structure_right3">
                  </div>
                </div>

                <div class="structure_right_bottom">
                  <div class="structure_right4_left">
                  </div>
                  <div class="structure_right4_right">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>



        <!-- 骨架部分结束 -->

        <div class="cg_second_body_description" id="createGroups-scroll">
          <LazyLoad :list="createGroupsInt" :options="{ele:'pic-lazyLoad',scrollEle: 'createGroups-scroll'}">

            <div class="s_body_des" v-for="(item, index) in createGroupsInt">
              <div class="s_body_des_detail">
                <div class="s_body_detail_left pic-lazyLoad" :data-src="item.pics[0] ? (item.pics[0].url300x300) : defaultImg" @click="gotoDetail(item)">
                  <!-- <div class="s_body_detail_left pic-lazyLoad" > -->

                </div>
                <div class="s_body_detail_right">
                  <div class="s_body_detail_right_top">
                    <div class="s_body_detail_right1" @click="gotoDetail(item)">
                      {{item.name}}
                    </div>
                    <div class="s_body_detail_right2">
                      零售价 ¥{{item.mpPrice}}
                    </div>
                    <div class="s_body_detail_right3">
                      团购时间 {{item.grouponStartTimeStr + "-" +item.grouponEndTimeStr}}
                    </div>
                  </div>
                  <div class="s_body_detail_right_bottom">
                    <div class="s_body_detail_right4_left">
                      <span class="prize prize_des">奖</span><span class="prize prize_num">{{item.reward}}元</span>/每盒
                    </div>
                    <div class="s_body_detail_right4_right" @click="showRule(item)">
                      去赚钱
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoad>
        </div>
      </div>

      <!-- 导航的第一部门内容结束 -->
      <!-- 导航第二部分内容开始 -->

      <div class="cg_another_body" v-show="secondSection">
        <!-- 无数据时显示 -->
        <div class="nogoods-style" v-show="myGroupsList">
          <div class="cg_ss_body_title nogoods-style-title">
            <span class="cg_ss_title1">团购商品</span>
            <span class="cg_ss_title2">分享越多收益越多</span>
          </div>
          <div class=" nogoods-style1-img1">
          </div>
          <p class="nogoods-style1-text">暂无团购商品</p>
          <div class="nogoods-style1-botton" @click="pickItem(1)">
            去赚钱
          </div>
        </div>
        <div class="cg_anby_circle" v-for="(item, index) in createGroupsList">
          <div class="cg_ss_body_title" v-show="(determineTitle == index)">
            <span class="cg_ss_title1">团购商品</span>
            <span class="cg_ss_title2">分享越多收益越多</span>
          </div>


          <div class="s_body_des">
            <div class="s_body_des_detail">
              <div class="s_body_detail_left" v-if="item.pics.length" :style="{'backgroundImage':'url('+ item.pics[0].url300x300 + ')'}" @click="gotoDetail(item)">
              </div>
              <div class="s_body_detail_left " v-else>
              </div>
              <div class="s_body_detail_right">
                <div class="s_body_detail_right_top">
                  <div class="s_body_detail_right1" @click="gotoDetail(item)">
                    {{item.name }}
                  </div>
                  <div class="s_body_detail_right2">
                    零售价 ¥{{item.mpPrice }}
                  </div>
                  <div class="s_body_detail_right3">
                    团购时间 {{item.grouponStartTimeStr + "-" +item.grouponEndTimeStr}}
                  </div>
                </div>
                <div class="s_body_detail_right_bottom">
                  <div class="s_body_detail_right4_left">
                    <span class="prize prize_des">奖</span><span class="prize prize_num">{{item.reward}}元</span>/每盒
                  </div>
                  <div class="s_body_detail_right4_right" @click="showRule(item)">
                    去赚钱
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cg_another_child">
            <div class="child_description" v-for="($item, $index) in pointerList[index]">
              <div class="child_description_left">
                <p class="child_lf_text">团{{$index + 1}}</p>
                <p class="child_lf_prize">¥{{$item.totalAmt}}/{{$item.productNum}}盒，{{$item.saleDiscount}}折</p>
              </div>
              <div class="child_description_right">
                <div class="child_share" @click="showShareComponent($item,item)">
                  分享
                </div>
                <div class="child_delete" @click="deleteGroupon(index,$item,$index)">
                  删除
                </div>
              </div>
            </div>
            <div class="choose_botton" v-show="choose_botton[index] == index" @click="chooseBotton(2,index)">
              <div class="choose_botton_text">
                展开
              </div>
              <div class="choose_botton_arrow choose_botton_arrow0">

              </div>
            </div>
            <div class="choose_botton" v-show="!(choose_botton[index] == index)" @click="chooseBotton(1,index)">
              <div class="choose_botton_text">
                收起
              </div>
              <div class="choose_botton_arrow choose_botton_arrow1">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  商品部分结束-->

    <ShareImg :goodsName="goodsName" :saleDisc="saleDisc" :rulePopup="rulePopup" :$salePrice="$salePrice" :$totalAmt="$totalAmt" :cgShareC="cgShareC" @toggleRulePopup="toggleRulePopup"></ShareImg>
    <Rule :ruleText="ruleText" :rebateArr="rebateArr" :grouponPrice="grouponPrice" :mpPrice="mpPrice" @toggleRuleText="toggleRuleText" @sendGroup="initiateGroup"></Rule>
    <Sure :sureChoose="sureChoose" @toggleSureChoose="toggleSureChoose" @qrcodeShare="qrcodeShare" @shareAction="shareAction"></Sure>
    <UIShare></UIShare>
    <CircleLoad :loadedshow="loadedshow"></CircleLoad>



  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import LazyLoad from '@/components/widget/lazyLoad'

import * as Model from '@/model/peopleGroups'

import app from '@/widget/app'

import utils from '@/widget/utils'

import config from '@/config/index'

import ShareImg from '@/components/peopleGroups/shareImg'

import Rule from '@/components/peopleGroups/rule'

import Sure from '@/components/peopleGroups/sure'

import UIShare from '@/components/widget/ui-share'

import CircleLoad from '@/components/peopleGroups/circleLoad'



import {
  mapGetters,
  mapActions
} from 'vuex'

import common from '@/widget/common'

export default {
  data() {
    return {
      title: "全民团购",
      pageView: true,
      pick: true,
      firstSection: true,
      secondSection: false,
      determineTitle: 0,
      choose_botton: [],
      rulePopup: false,
      ruleText: false,
      sureChoose: false,
      skeleton: true,
      createGroupsInt: [],
      createGroupsList: [], //我的团父级数组
      childList: [],
      childList1: [],
      pointerList: [],
      grouponProductId: "",
      cgShareC: "",
      dtGroupsUrl: config.hostPath + "/activity/peopleGroups/detailGroups",
      loadedshow: false,
      grouponPrice: "",
      mpPrice: "",
      shuaxin: [],
      a: [],
      suoyin: [],
      $salePrice: "",
      $totalAmt: "",
      defaultImg: config.hostPath + "/activity-static/images/bgdefault.png",
      goodsName: "",
      // pointerId :1,
      totalAmount: "",
      myGroupsInt: false,
      myGroupsList: false,
      rebateArr: [],
      saleDisc: "",
      goodsDescription: {},



    }
  },
  components: {
    AppHeader,
    ShareImg,
    Rule,
    Sure,
    LazyLoad,
    UIShare,
    CircleLoad,

  },
  computed: {
    ...mapGetters({
      'headerMenu': 'getHeaderMenu'
    })
  },
  methods: {
    ...mapActions([
      'updateHeaderMenu',
      'updateShareMenu'
    ]),
    jumpPage() {
      location.href = "/activity/bulk/incentive"
    },

    // 跳转详情页
  gotoDetail: function(item) {

    if (utils.isApp()) {
      location.href = 'lyf://productdetail?body={"mpId":' + item.mpId + '}';
    } else {
      location.href = '/detail.html?itemId=' + item.mpId;
    }
  },
    /**
     * 固定导航条效果
     */

    fixedNa() {
      let scrollHeight = document.querySelector('.cg_first_section').clientHeight
      let navigatorBar = document.querySelector('.cg_navigation')
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > scrollHeight) {
          if (utils.isApp() || utils.weixin()) {
            navigatorBar.style.cssText = "position:fixed; width:100%;top:.0rem;z-index:99;"
          } else {
            navigatorBar.style.cssText = "position:fixed; width:100%;top:.88rem;z-index:99;"

          }
        } else {
          navigatorBar.style.cssText = "position:static;"
        }
      }, false)
    },

    showShareComponent(val, item) {
      if (item.managementState == 0) {
        this.$toast('商品已下架')
        return
      }
      this.goodsDescription.goodsImgUrl = item.pics[0].url100x100
      this.goodsDescription.goodsText = item.name
      this.goodsDescription.goodsSubtitle = item.subtitle
      this.saleDisc = val.saleDiscount / 10
      this.$salePrice = val.salePrice
      this.$totalAmt = val.productNum
      this.cgShareC = val.shareCode
      this.goodsName = item.name
      this.sureChoose = true
    },

    /**
     *  删除
     */

    deleteGroupon(num, val, index) {
      let self = this
      this.$showModal({
        content: '确认删除团购？',
        cancelText: '取消',
        confirmText: '删除',
        success() {
          self.loadedshow = true
          Model.deleteGroupon({
            type: 'POST',
            data: {
              activityId: val.grouponActivityId
            }
          }).then((result) => {
            if (result.code == 0) {
              self.loadedshow = false
              self.$toast('删除成功')
              self.childList[num].splice(index, 1)
              self.childList1[num] = self.childList[num].slice(0, 2)
              if (self.suoyin[num] === num) {
                self.a[num] = self.childList1[num]
                self.pointerList[num] = self.childList[num]
              } else {
                self.pointerList[num] = self.childList1[num]
              }
              self.createGroupsList = []
              self.createGroupsList = self.shuaxin

            } else if (result.code == -1) {}
          })

        }
      })


    },

    toggleRulePopup(val) {
      this.rulePopup = val

    },
    showRule(item) {
      if (item.managementState == 0) {
        this.$toast('商品已下架')
        return
      }
      this.ruleText = true
      utils.appViewFixed()
      this.grouponProductId = item.grouponProductId
      this.grouponPrice = item.mpPrice
      this.mpPrice = item.reward
    },
    toggleRuleText(val) {
      this.ruleText = val
      utils.appViewFixed()
    },
    toggleSureChoose(val) {
      this.sureChoose = val
    },
    qrcodeShare(val) {
      this.rulePopup = val
    },

    chooseBotton(val, index) {
      if (val == 1) {
        this.suoyin[index] = "c"
        this.choose_botton[index] = index
        this.childList1[index] = this.a[index]
        this.pointerList[index] = this.childList1[index]
        this.createGroupsList = []
        this.createGroupsList = this.shuaxin

      } else if (val == 2) {
        this.suoyin[index] = index
        this.a[index] = this.childList1[index]
        this.choose_botton[index] = "a"
        this.pointerList[index] = this.childList[index]
        this.createGroupsList = []
        this.createGroupsList = this.shuaxin
      }
    },

    /**
     * share operation
     */
    shareAction() {
      if (!(utils.isApp() || utils.weixin())) {
        this.$toast('请在APP或微信中打开分享')
        return
      }
      let weixinShareUrl = this.dtGroupsUrl + "?shareCode=" + this.cgShareC
      const shareConfig = {
        link: weixinShareUrl,
        title: this.goodsDescription.goodsText,
        description: this.goodsDescription.goodsSubtitle,
        imgUrl: this.goodsDescription.goodsImgUrl,
        platforms: [
          "WechatMoments",
          "Wechat",
          "QQ",
          "QZone"
        ]
      }
      if (utils.loggedIn()) {
        app.shareAction.call(this, shareConfig, () => {
        })
      } else {
        app.loginAction()
      }
    },


    pickItem(val) {
      if (val == 1) {
        this.pick = true
        this.firstSection = true
        this.secondSection = false
      } else if (val == 2) {
        this.pick = false
        this.firstSection = false
        this.secondSection = true
      }
    },

    /**
     *  金额接口
     */

    getWholeSaleAward() {
      Model.getWholeSaleAward({
        type: 'POST',
      }).then((result) => {
        if (result.code == 0) {
          this.totalAmount = result.data.totalAmount
        } else if (result.code == -1) {
        }
      })
    },

    getGrouponRuleList() {
      Model.getGrouponRuleList({
        type: 'POST',
      }).then((result) => {
        if (result.code == 0) {
          this.rebateArr = result.data
        } else if (result.code == -1) {
        }
      })
    },

    /**
     *  初始化接口
     */

    groupsInt() {
      this.skeleton = true
      Model.groupsInt({
        type: 'POST',
        data: {
          pageNo: 1,
          pageSize: 200,
        },
      }).then((result) => {
        if (result.code == 0) {
          this.skeleton = false
          this.createGroupsInt = result.data.listObj
          if (this.createGroupsInt.length < 1) {
            this.myGroupsInt = true
          }
        } else if (result.code == -1) {

        }
      })

    },

    groupsList(val) {
      Model.groupsList({
        type: 'POST',
        data: {
          pageNo: 1,
          pageSize: 200,
        },
      }).then((result) => {
        if (result.code == 0) {
          this.loadedshow = false
          if (val == 1) {
            this.$toast('添加成功')
          }
          let groupList = result.data.listObj
          this.shuaxin = groupList
          this.createGroupsList = groupList
          if (this.createGroupsList.length < 1) {
            this.myGroupsList = true
          } else if (this.createGroupsList.length >= 1) {
            this.myGroupsList = false
          }
          this.childList = []
          this.childList1 = []
          this.choose_botton = []
          for (var i = 0; i < groupList.length; i++) {
            this.choose_botton.push(i)
            this.childList.push(groupList[i].activityVOList)
            this.childList1.push(groupList[i].activityVOList.slice(0, 2))
          }
          this.pointerList = this.childList1
        } else if (result.code == -1) {

        }
      })

    },

    /**
     *  发起团购接口
     */
    initiateGroup(val) {
      this.loadedshow = true

      Model.initiateGroup({
        type: 'POST',
        data: {
          productNum: val.number,
          saleDiscount: val.rebate,
          grouponProductId: this.grouponProductId

        }
      }).then((result) => {
        if (result.code == 0) {} else if (result.code == -1) {}
      }).then(() => {
        this.groupsList(1)
      })
    },
  },
  created() {
    this.groupsInt()
    this.groupsList()
    this.getWholeSaleAward()
    this.getGrouponRuleList()

    setTimeout(() => {
      this.fixedNa()
    }, 0)
  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
