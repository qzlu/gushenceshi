<template>
  <div class="container" >
    <div class="main" v-if="!finish">
      <img v-if="url" :src="url+'loading-bg.png'" alt="" mode="widthFix" class="question-bg">
      <div class="loading-content">
          <div class="loading"></div>
      </div>
      <div class="loading-text">组合大师分析中...</div>
    </div>
    <div class="main" v-if="finish">
      <button open-type="getUserInfo" lang="zh_CN" style="display:none">获取用户信息</button>
      <img mode="widthFix" class="result-bg" :src="url+levelArr[star].bgImg" alt="">
      <div class="result">
          <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
          <div class="result-text-content">
            <div class="dashed-border"></div>
            <div class="userinfo-nickname">
              <card :text="userInfo.nickName"></card>
            </div>
            <div class="level">
              {{levelArr[star].level}}
            </div>
            <div class="result-text">
              {{levelArr[star].text}}
              <p class="paipaijun">排排君赠言：{{levelArr[star].paipai}}</p>
            </div>
            <div class="flex-box">
              <button class="save-img">保存图片</button>
              <button class="share">分享给好友</button> 
            </div>
          </div>
          <div class="read-answer">
              <div class="border"></div>
              <p>A股神出鬼没的物种是什么？</p>
              <p>关灯吃面有什么样的典故</p>
              <p>我国国民健康状况到底有多槽糕？</p>
              <button>查看题目答案</button>
          </div>
      </div>
      <img mode="widthFix" :src="url+'footer.png'" alt="" style="width:100%;margin-top:-20rpx">
    </div>
    <canvas canvas-id="mycanvas" style="width: 375px;height: 2030rpx;position:fixed;top:9999px" ></canvas>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      url: 'http://111.230.169.178/img/',
      finish: true,
      star: null,
      levelArr: [
        {
          bgImg: 'one-star.png',
          level: '初级韭菜',
          paipai: '年轻人，还需要历练哦！',
          text: '要买什么股票，什么时候卖,你自己完全懵逼。拿着股票总感觉不踏实，所以交易频繁，时赚时亏，总的来说，账户是亏损的。你还在学习抄底阶段，经常抄在地板上，没想到还有地下室，抄在地下室，没想到还有地窖，抄在地窖，没想到还有地狱，抄死抄到地狱里，结果死也没想到地狱真的有十八层！'
        },
        {
          bgImg: 'two-star.png',
          level: '资深韭菜',
          paipai: '别说了，关灯吧！',
          text: '满仓套牢时的抑郁，空仓等底时的着急，轻仓试探时的迷茫，让你开始怀疑人生。你经常感觉自己是传说中的主力监控，一卖就涨，一买就跌，一进场就千股跌停！在你这里，只有四只股票涨的最好：一是别人买的股票，二是自己刚刚卖掉股票，三看好想买却没买的股票，四打了单没买上的股票！人生很艰难，且行且珍惜！'
        },
        {
          bgImg: 'three-star.png',
          level: '韭菜战斗机',
          paipai: '梦想总是要有，万一实现了呢！',
          text: '你是韭菜中的绝对王者，在韭菜中绝对无敌的存在。你和所有韭菜都能找到共同话题，所有的韭菜都能轻而易举的成为你的知己。你钟爱满仓，总是情不自禁一次性或分批次将所有资金投入到股市中。股市虐你千百遍，你待股市如初恋。你认为A股的快乐在于受虐的变态美，你坚信只要坚持总会胜利'
        },
        {
          bgImg: 'four-star.png',
          level: '韭坛神话',
          paipai: '大侠，离开A股何以悟人生！',
          text: '北上广不相信眼泪，黑吉辽不相信喝醉，江浙沪晒不干棉被，全国股民应自觉组团互相安慰。慢慢的你发现，世界那么大，除了股市之外，还有更多美好值得我们去享受。最重要的是，这个世界上肯定还有比你还惨的人！'
        },
        {
          bgImg: 'five-star.png',
          level: '股海大神',
          paipai: '无需多言，膜拜大神！',
          text: '厉害了，想必你在股市已见惯风雨，波澜不惊。已经做到不以涨喜，不以跌悲，手中有股，心中无股！你深知，在A股混，必须练就大心脏，没必要动不动伤春悲秋。毕竟冬寒已经过去一半！还有一半！你是如此淡定，只是有时睡梦中惊醒，眼角是湿的。'
        }
      ],
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
    },
    /**
     * 生成图片
     */
    creatImg () {
      // var _this = this
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.fillRect(0, 0, 375, 1015)
      const path = '/static/img/five.jpg'
      ctx.drawImage(path, 0, 0, 375, 880)
      ctx.draw()
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  onLoad (option) {
    this.star = option.star - 1
  },
  mounted () {
    setTimeout(() => {
      this.finish = true
    }, 2000)
  }
}
</script>

<style scoped>
    .container,.main,.question-bg{
        height: 100%;
        width: 100%;
        position: relative;
    }
    .loading-content{
        width: 350rpx;
        height: 350rpx;
        border: 2px solid #282c38;
        border-radius: 50%;
        position: absolute;
        top: 370rpx;
        left: 50%;
        margin-left: -175rpx;
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
        top: 800rpx;
        left: 50%;
        margin-left:-144rpx;
    }
    .result-bg{
      width: 100%;
      height: 2330rpx !important;
    }
    .result{
      position: absolute;
      top:974rpx;
      text-align: center
    }
    .dashed-border{
      position:absolute;
      width:652rpx;
      height:822rpx;
      border:4rpx dashed #fff3f3;
      border-radius: 20rpx;
      left:44rpx;
      top:64rpx;
    }
    .result-text-content{
      width: 670rpx;
      height: 840rpx;
      border: 14rpx solid #e1524c;
      border-radius: 20rpx;
      box-sizing: border-box;
      margin-left:40rpx;
      margin-top: -76rpx;
      padding: 34rpx;
    }
    .userinfo-avatar {
      width: 114rpx;
      height: 114rpx;
      border-radius: 50%;
      border: 6rpx solid #e45253;
      position:relative;
      background:white;
      z-index:1000;
    }

    .userinfo-nickname {
      color:black;
      text-align: center;
      padding-top: 42rpx;
      margin-left:-50rpx
    }
    .result-text{
      font-size: 28rpx;
      text-align: left
    }
    .level{
      height: 160rpx;
      line-height: 160rpx;
      background: url('http://111.230.169.178/img/leval-bg.png') center no-repeat;
      background-size: 220rpx;
      margin-left: -63rpx;
    }
    .paipaijun{
      margin: 20rpx 0;
      font-weight: bold
    }
    .result .flex-box{
      justify-content: space-around
    }
    .save-img,.share{
      height: 74rpx;
      line-height: 74rpx;
      border-radius: 40rpx;
      color: #ffffff;
    }
    .save-img{
      width: 248rpx;
      background: #e22716
    }
    .share{
      width: 270rpx;
      background: -moz-linear-gradient(#ea7c1a,#b93d21);
      background: -webkit-linear-gradient(#ea7c1a,#b93d21);
      background: -o-linear-gradient(#ea7c1a,#b93d21);
    }
    .read-answer{
      width: 670rpx;
      height: 380rpx;
      border: 14rpx solid #e1524c;
      border-radius: 20rpx;
      box-sizing: border-box;
      margin-left:40rpx;
      margin-top: 40rpx;
      padding: 34rpx;
      position: relative;
    }
    .read-answer p{
      font-size: 28rpx;
      font-weight: bold;
      line-height: 56rpx;
    }
    .read-answer button{
      width: 500rpx;
      height: 90rpx;
      margin-top: 30rpx;
      background: #c62221;
      border-radius: 40rpx;
      color: white;
    }
    .border{
      position:absolute;
      width:650rpx;
      height:360rpx;
      border:4rpx dashed #fff3f3;
      border-radius:20rpx;
      left:-8rpx;
      top:-8rpx;
    }
</style>
