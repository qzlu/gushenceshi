<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <img v-if='url' :src="url+'index-bg.png'" alt="" mode="widthFix" class="index-bg">
    <div class="main-content">
        <div class="logo flex-box center"><img v-if='url' :src="url+'logo.png'" alt="" mode="widthFix"></div>
        <div class="theme flex-box center"><img v-if='url' :src="url+'theme-index.png'" mode="widthFix" alt=""></div>
        <div class="text-content flex-box center">
            <div><img v-if='url' :src="url+'ball-index.png'" mode="widthFix" alt=""></div>
        </div>
        <div class="text">
            A股是最磨练意志力的地方，没有之一！十年炒股两茫茫，先亏车，后赔房，在这场股市灾害中，
            <h3>你究竟处于那个段位？</h3>
        </div>
       <button class="to-test" @click="toTest()">我来测测</button>
       <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"> 获取手机号</button> 
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
const app = getApp()
export default {
  data () {
    return {
      url: 'http://111.230.169.178/img/',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    toTest () {
      app.sensors.track('toTest',{
          test:'1'
      })
      // const url = '../question/main'
      // const url = '../answer/main'
      const url = '../result/main?star=1'
      // const url = '../share/main?star=5&avatarUrl=https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEI6pHCb8iayyGRJIrj3hz5vONuU2icbXQgE6HRf8tkPuTNX4lrRRGuL4o7VpIBkiayGxj16dcEj6de7g/132&nickName=LQZ'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (obj) => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
          wx.request({
            url: 'https://weixin-test.simuwang.com/gateway/wxLogin',
            data: {
              code: obj.code
            },
            function (params) {
              console.log('2222222',params)
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getPhoneNumber: function(e) { 
	  console.log(e) 
	} 
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
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
    width: 150px;
}
.theme{
    margin-top: 50px;
}
.text-content{
    margin-top: 80rpx;
}
.text-content img,.theme img{
    width: 330px;
}
.text{
    width: 650rpx;
    height: 240rpx;
    background: #ffffff;
    border: 1px solid white;
    margin: -20px auto;
    text-indent: 2em;
    padding-top: 54rpx;
    padding-left: 40rpx;
    padding-right: 20rpx;
    font-size: 30rpx;
    line-height: 48rpx;
    box-shadow: 0 0 7px 1px rgba(202,202,202,0.50);
}
.text h3{
    text-align: center;
    font-size: 36rpx;
    font-weight: bold
    
}
.to-test{
    width: 500rpx;
    height: 88rpx;
    line-height: 88rpx;
    margin-top: 50px;
    background: #c82222;
    color: white
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
