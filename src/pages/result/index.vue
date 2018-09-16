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
     * 生成图片
     */
    creatImg () {
      const ctx = wx.createCanvasContext('myCanvas')
      // const path = 'http://111.230.169.178/img/one-star.png'
      const path = '/static/img/five.jpg'
      ctx.setFillStyle('red')
      // 绘制背景图片
      ctx.drawImage(path, 0, 0, this.width, this.canvasHeight)
      var n = this.width / 375 // 像素比
      var x1 = n * 162
      var y1 = n * 432
      var borderWidth = n * 3 // 头像边框宽度
      // 绘制矩形内容
      ctx.setStrokeStyle('#e1524c')
      ctx.setLineWidth(n * 7)
      ctx.strokeRect(n * 20, n * 460, n * 336, n * 420)
      /*  ctx.rect(n * 20, n * 460, n * 336, n * 420)
      ctx.setLineWidth(n * 7)
      ctx.strokeStyle = '#e1524c' */
      ctx.stroke()
      // 绘制用户头像
      ctx.arc(x1 + n * 29, y1 + n * 29, n * 29, 0, 2 * Math.PI)
      ctx.strokeStyle = '#e4554f'
      ctx.setLineWidth(borderWidth)
      ctx.stroke()
      ctx.clip()
      ctx.drawImage(this.userUrl, x1 + 2, y1 + 2, n * 50, n * 50)
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
    this.creatImg()
  }
}
</script>

<style scoped>

</style>
