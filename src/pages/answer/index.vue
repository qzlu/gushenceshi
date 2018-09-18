<template>
  <div class="container">
     <!-- <div @click="saveImg()">保存图片</div> -->
      <canvas :style="{width:width+'px',height:canvasHeight+'px'}" canvas-id="myCanvas"></canvas>  
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      url: 'http://111.230.169.178/img/',
      motto: 'Hello World',
      userInfo: {},
      width: null, // 手机宽度
      canvasHeight: null, // 设置canvas高度
      tempFilePath: null, // 生成图片的地址
      userUrl: null // 头像地址
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
      var _this = this
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              wx.downloadFile({
                url: res.userInfo.avatarUrl,
                success: function (res) {
                  if (res.statusCode === 200) {
                    _this.userUrl = res.tempFilePath
                    console.log(res)
                  }
                }
              })
            }
          })
        }
      })
    },
    /**
     * 获取屏幕宽度
     */
    getSystemInfo () {
      var _this = this
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.windowWidth)
          _this.width = res.windowWidth
          _this.canvasHeight = _this.width / 375 * 1015
        }
      })
    },
    /**
     * 下载图片
     */
    downloadImg () {
      const imgArr = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg']
      const url = this.url+imgArr[1]
      let _this = this
      let path
      wx.downloadFile({
        url:url,
        success: function (json) {
          if (json.statusCode === 200) {
            path = json.tempFilePath
            console.log(json)
            _this.creatImg(path)
          }
        }
      })
    },
    /**
     * 生成图片
     */
    creatImg (path) {
      const ctx = wx.createCanvasContext('myCanvas')
      //const path = 'http://111.230.169.178/img/one.jpg'
      // const path = '/static/img/five.jpg'
      ctx.setFillStyle('red')
      // 绘制背景图片
      ctx.drawImage(path, 0, 0, this.width, this.canvasHeight)
      var n = this.width / 375 // 像素比
      var x1 = n * 160
      var y1 = n * 430
      var borderWidth = n * 3 // 头像边框宽度
      // 绘制用户名
      ctx.setFillStyle('white')
      ctx.fillRect(x1, y1 + n * 60, n * 60, n * 40)
      ctx.fill()
      ctx.setFontSize(20)
      ctx.setTextAlign('center')
      ctx.fillStyle = 'black'
      ctx.fillText(this.userInfo.nickName, x1 + n * 28, y1 + n * 90)
      // 绘制底部小程序码
      ctx.drawImage('/static/img/qrcode.jpg', 0, n * 870, n * 375, n * 135)
      // 绘制用户头像
      ctx.arc(x1 + n * 28, y1 + n * 28, n * 28, 0, 2 * Math.PI)
      ctx.strokeStyle = '#e4554f'
      ctx.setLineWidth(borderWidth)
      ctx.stroke()
      ctx.clip()
      ctx.drawImage(this.userUrl, x1, y1, n * 56, n * 56)
      ctx.draw()
    },
    /**
     * 保存到本地
     */
    saveImgToPhone () {
      var that = this
      wx.saveImageToPhotosAlbum({
        filePath: that.tempFilePath,
        success (res) {
          console.log('保存成功', res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    /**
     * 点击保存图片
     */
    saveImg () {
      var _this = this
      // 生成图片
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: function (res) {
            _this.tempFilePath = res.tempFilePath
            console.log(_this.tempFilePath, res)
            _this.saveImgToPhone()
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }, 200)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getSystemInfo()
  },
  mounted () {
    this.downloadImg()
  }
}
</script>

<style scoped>

</style>
