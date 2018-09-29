<template>
  <div class='container'>
        <img v-if='url' :src="url+'quetion-bg.jpg'" alt="" mode="scaleToFill" class="question-bg">
        <div class="head"><img v-if='url' class="head-bg" :src="url+'head.png'" alt="" mode="widthFix"></div>
        <div v-for='(item,index) in questionList' :key='index' class="list" :style="{'z-index':item.position,'left':item.left}">
          <h3>{{item.question}}</h3>
          <ul>
              <li class="flex-box" v-for='(obj,i) in item.answerLists' :key='i' @click="selectAnswer(item,obj,index)">
                        <label :for="obj.answer">{{obj.answer}}</label>
                        <img :src="obj.src" mode="widthFix">
              </li>
          </ul>
          <div class="flex-box">
            <button class="pre" v-if="index>0" @click="preQuestion(index)">上一题</button>
            <button class="pre finish" v-if="index===questionList.length-1" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">完成</button>
          </div>
        </div>
        <div class="page-index">{{currentPage}}/{{questionList.length}}</div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
      url: 'https://weixin.simuwang.com/Public/Image/Weixin/201810/',
      questionList: [{
        question: '1、您入市炒股的时间多长？',
        answerLists: [{answer: 'A、三个月以下', score: 1, src: '/static/img/default-check.png'}, {answer: 'B、半年左右', score: 2, src: '/static/img/default-check.png'}, {answer: 'C、一年以上', score: 3, src: '/static/img/default-check.png'}, {answer: 'D、两年以上', score: 4, src: '/static/img/default-check.png'}],
        position: 10,
        left: '40rpx',
        score: null
      },
      {
        question: '2、截至目前，A股最高点是多少？',
        answerLists: [{answer: 'A、5178点', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、6023点', score: 0, src: '/static/img/default-check.png'}, {answer: 'C、6124点', score: 1, src: '/static/img/default-check.png'}, {answer: 'D、12135点', score: 0, src: '/static/img/default-check.png'}],
        position: 9,
        left: '40rpx',
        score: null
      },
      {
        question: '3、A股中，最神出鬼没的“物种”是什么？',
        answerLists: [{answer: 'A、独角兽', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、白龙马', score: 0, src: '/static/img/default-check.png'}, {answer: 'C、虾夷贝', score: 1, src: '/static/img/default-check.png'}, {answer: 'D、黑天鹅', score: 0, src: '/static/img/default-check.png'}],
        position: 8,
        left: '40rpx',
        score: null
      },
      {
        question: '4、有人说“屌丝死于现金贷，明星死于贾跃亭”，请问下面哪位明星万幸没有投资乐视？',
        answerLists: [{answer: 'A、刘涛', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、黄渤', score: 1, src: '/static/img/default-check.png'}, {answer: 'C、王宝强', score: 0, src: '/static/img/default-check.png'}, {answer: 'D、孙红雷', score: 0, src: '/static/img/default-check.png'}],
        position: 7,
        left: '40rpx',
        score: null
      },
      {
        question: '5、“关灯吃面”的典故出自哪里？',
        answerLists: [{answer: 'A、满仓中石油', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、重庆啤酒黑天鹅事件', score: 1, src: '/static/img/default-check.png'}, {answer: 'C、A股四次熔断', score: 0, src: '/static/img/default-check.png'}, {answer: 'D、2015年股灾', score: 0, src: '/static/img/default-check.png'}],
        position: 6,
        left: '40rpx',
        score: null
      },
      {
        question: '6、钻石底、婴儿底、幼儿底、儿童底等词汇，是哪个财经网红的发明？',
        answerLists: [{answer: 'A、但斌', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、韩志国', score: 0, src: '/static/img/default-check.png'}, {answer: 'C、李大霄', score: 1, src: '/static/img/default-check.png'}, {answer: 'D、叶檀', score: 0, src: '/static/img/default-check.png'}],
        position: 5,
        left: '40rpx',
        score: null
      },
      {
        question: '7、2015年股灾时，电视荧屏上出现许多“不友好”作品，其中，首推哪一部？',
        answerLists: [{answer: 'A、花千骨', score: 1, src: '/static/img/default-check.png'}, {answer: 'B、云中歌', score: 0, src: '/static/img/default-check.png'}, {answer: 'C、满仓进城', score: 0, src: '/static/img/default-check.png'}, {answer: 'D、碟中谍5', score: 0, src: '/static/img/default-check.png'}],
        position: 4,
        left: '40rpx',
        score: null
      },
      {
        question: '8、“股市四鸟”中，哪只鸟今年出现债务违约，危机重重？',
        answerLists: [{answer: 'A、太平鸟', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、报喜鸟', score: 0, src: '/static/img/default-check.png'}, {answer: 'C、贵人鸟', score: 0, src: '/static/img/default-check.png'}, {answer: 'D、富贵鸟', score: 1, src: '/static/img/default-check.png'}],
        position: 3,
        left: '40rpx',
        score: null
      },
      {
        question: '9、上市公司常山药业，对我国国民健康状况的最新“研究成果”是下面哪一项？',
        answerLists: [{answer: 'A、每8个中国人就有1个精神病', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、每5个中国男人就有1个阳痿', score: 1, src: '/static/img/default-check.png'}, {answer: 'C、每8对夫妻就有1对不孕不育', score: 0, src: '/static/img/default-check.png'}, {answer: 'D、每13个中国人就有1个糖尿病', score: 0, src: '/static/img/default-check.png'}],
        position: 2,
        left: '40rpx',
        score: null
      },
      {
        question: '10、中国股民有什么共同特点？',
        answerLists: [{answer: 'A、勤劳', score: 0, src: '/static/img/default-check.png'}, {answer: 'B、正直', score: 0, src: '/static/img/default-check.png'}, {answer: 'C、勇敢', score: 0, src: '/static/img/default-check.png'}, {answer: 'D、亏钱', score: 1, src: '/static/img/default-check.png'}],
        position: 1,
        left: '40rpx',
        score: null
      }],
      currentPage: 1 // 当前页
    }
  },

  components: {
    card
  },

  methods: {
    /**
     * 页面初始化
     */
    init () {
      for (var i =0; i < this.questionList.length; i++) {
          const item = this.questionList[i]
          if (item.score !== null){
              item.left = '40rpx'
              item.score = null
              for (var j = 0; j < item.answerLists.length; j++) {
                  const obj = item.answerLists[j]
                  if (obj.src !== '/static/img/default-check.png') {
                      obj.src = '/static/img/default-check.png'
                  }
              }
          }
      }
      this.currentPage = 1
    },
    // 选择答案
    selectAnswer (item, obj, index) {
      for (let i = 0; i < item.answerLists.length; i++) {
        const list = item.answerLists[i]
        if (list.src !== '/static/img/default-check.png') {
          list.src = '/static/img/default-check.png'
        }
      }
      obj.src = '/static/img/checked.png'
      item.score = obj.score
      if (this.currentPage < this.questionList.length) {
        item.left = '-100%'
        if (this.currentPage === index + 1) this.currentPage++ // 防止双击
      }
    },
    // 上一页
    preQuestion (index) {
      this.questionList[index - 1].left = '36rpx'
      if (this.currentPage === index + 1) this.currentPage-- // 防止双击
    },
    // 完成
    finish () {
      let sum = 0
      let star
      let arr = [0, 2, 5, 8, 10]
      for (let i = 0; i < this.questionList.length; i++) {
        const obj = this.questionList[i]
        sum += obj.score
      }
      for (let i = 0; i < arr.length; i++) {
        if (sum > arr[i]) {
          star = i + 1
        }
      }
      const url = '../result/main?star=' + star
      wx.navigateTo({ url })
    },
    bindGetUserInfo (e) {
        if (e.mp.detail.encryptedData!==undefined){
            this.finish()
        }
    },
  },

  created () {
  },
  mounted () {
  },
  onHide () {
      this.init()
  }
}
</script>

<style scoped>
    .container,.question-bg{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .head{
        position: absolute;
        top: 36rpx;
        width: 100%;
        text-align: center
    }
    .head .head-bg{
        width: 718rpx;
        height: 102rpx;
    }
    .list{
        width: 600rpx;
        height: 850rpx;
        position: absolute;
        top: 94rpx;
        background: white;
        border-radius: 4px;
        padding-top: 46rpx;
        padding-left: 36rpx;
        padding-right: 36rpx;
        /* box-shadow: 0 0 7px 1px rgba(202,202,202,0.50); */
        transition: left .5s;
    }
    .list h3 {
        font-size: 35rpx;
    }
    .list ul li{
        height: 90rpx;
        line-height: 90rpx;
        margin-top: 42rpx;
        background: #f9eff0;
        border-radius: 8rpx;
        justify-content: space-between;
        padding: 0 26rpx;
        font-size: 30rpx;
    }
    .list ul li label{
        width: 100%
    }
    .list ul li img{
        width: 46rpx;
        height: 46rpx;
        margin-top: 22rpx;
    }
    .pre{
        width: 276rpx;
        height: 70rpx;
        line-height: 70rpx;
        color: white;
        background: #c82222;
        margin-top: 80rpx;
        border-radius: 40rpx;
        background:-webkit-linear-gradient(left,#dc3b3d,#b23329);
    }
    .finish{
        background:#ee811a;
    }
    .page-index{
        width: 100%;
        position: absolute;
        text-align: center;
        bottom: 26rpx;
    }
</style>
