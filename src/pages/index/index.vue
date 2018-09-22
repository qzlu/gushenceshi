<template>
  <div class="container">
    <img v-if='url' :src="url+'index-bg.jpg'" alt="" mode="widthFix" class="index-bg">
    <div class="main-content">
        <div class="logo flex-box center"><img v-if='url' :src="url+'logo.png'" alt="" mode="widthFix"></div>
        <div class="theme flex-box center"><img v-if='url' :src="url+'theme-index.png'" mode="widthFix" alt=""></div>
        <div class="text-content flex-box center">
            <div><img v-if='url' :src="url+'ball-index.png'" mode="widthFix" alt=""></div>
        </div>
        <div class="text">
            A股是最磨练意志力的地方，没有之一！十年炒股<br>两茫茫，先亏车，后赔房，在这场股市灾害中，
            <h3>你究竟处于哪个段位？</h3>
        </div>
       <button class="to-test" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">{{text}}</button>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
const app = getApp()
export default {
  data () {
    return {
      url: 'https://weixin-test.simuwang.com/Public/Image/Weixin/201810/',
      text: '我来测测'
    }
  },

  components: {
    card
  },

  methods: {
    bindGetUserInfo (e) {
        const url = '../question/main'
        //const url = '../result/main?star=5'
        //const url = '../answer/main'
        // const url = '../share/main?star=0&avatarUrl=https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEI6pHCb8iayyGRJIrj3hz5vONuU2icbXQgE6HRf8tkPuTNX4lrRRGuL4o7VpIBkiayGxj16dcEj6de7g/132&nickName=LQZ'
        if (e.mp.detail.encryptedData!==undefined){
            wx.navigateTo({ url })
        }
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (obj) => {
          app.sensors.track('LOGIN',{
              $latest_utm_sign: '20005',
              $latest_utm_platform: 'xcx'
          })
          wx.request({
            url: 'https://weixin-test.simuwang.com/gateway/wxLogin',
            data: {
              code: obj.code
            },
            success: function (params) {
              wx.setStorage({
                key:"sign",
                data:params.data.sign
              })
            }
          })
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    //神策统计添加自定义属性
    app.sensors.para.autoTrack.appLaunch={
      $latest_utm_sign: '20005',
      $latest_utm_platform: 'xcx'
    }
    app.sensors.para.autoTrack.appShow={
      $latest_utm_sign: '20005',
      $latest_utm_platform: 'xcx'
    }
    app.sensors.para.autoTrack.pageShow={
      $latest_utm_sign: '20005',
      $latest_utm_platform: 'xcx'
    }
  },
}
</script>

<style scoped>
.container{

}
.index-bg{
    width: 100%;
    height: 100%;
    position: relative;
}
.main-content{
    width: 100%;
    height: 100%;
    position: absolute;
}
.logo{
    margin-top: 20px;
}
.logo img {
    width: 259rpx;
    height:73rpx;
}
.theme{
    margin-top: 50px;
}
.text-content{
    margin-top: 80rpx;
}
.theme img{
    width: 684rpx;
    height: 368rpx;
}
.text-content img{
    width: 700rpx;
    height: 100rpx;
}
.text{
    width: 650rpx;
    height: 240rpx;
    background:-webkit-linear-gradient(#ffffff,#f8e8e1);
    border-radius: 14rpx;
    margin: -20px auto;
    box-sizing: border-box;
    text-align: center;
    padding-top: 34rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    font-size: 26rpx;
    line-height: 48rpx;
    box-shadow: 0 0 7px 1px rgba(202,202,202,0.50);
}
.text h3{
    text-align: center;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 80rpx;
}
.to-test{
    width: 500rpx;
    height: 88rpx;
    line-height: 88rpx;
    margin-top: 50px;
    border-radius: 50rpx;
    background: #c82222;
    color: white;
    background:-webkit-linear-gradient(right,#dc3b3d,#b23329);
}
</style>
