<template>
  <div class="container">
      <img src="/static/img/loading-bg.png" alt="" mode="widthFix" class="question-bg">
      <div class="loading-content">
          <div class="loading"></div>
      </div>
      <div class="loading-text">组合大师分析中...</div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
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
        height: 100%;
        width: 100%;
        position: relative;
    }
    .question-bg{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .loading-content{
        width: 350rpx;
        height: 350rpx;
        border: 2px solid #282c38;
        border-radius: 50%;
        position: absolute;
        top: 320rpx;
        animation: loading 2s infinite linear;
    }
    .loading{
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        background: #2a2d3c;
        position: absolute;
        left: 50%;
        top: -18rpx;
    }
    @keyframes loading{
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
    .loading-text{
        position: absolute;
        top: 720rpx;
    }
</style>
