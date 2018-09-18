<template>
  <div>
      <div class="modal-mask" v-if="showModal"></div>
      <div class="modal-dialog" v-if="showModal">
          <h3>{{title1}}</h3>
          <h3>{{title2}}</h3>
          <h3 v-if="title3">{{title3}}</h3>
          <div class="content">
              <img v-if="imgUrl" :src="imgUrl" alt="">
              {{text}}
          </div>
          <div class="footer">
              <button @click="confirm" v-if="btnText">{{btnText}}</button>
              <button v-if="getPhone" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">确认并查看答案</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      showModal: Boolean,
      title1: String,
      title2: String,
      title3: String,
      imgUrl: String,
      text: String,
      btnText:String,
      getPhone:Boolean
  },
  methods:{
    confirm(){
        this.$emit("confirm")
    },
    getPhoneNumber (e) {
        this.$emit('getPhone',e)
    },
  }
}
</script>

<style>
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  width: 500rpx;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 9999;
  background: #f9f9f9;
  margin: -400rpx 85rpx;
  border-radius: 10rpx;
  padding: 40rpx;
  font-size: 28rpx; 
}
.content{
    line-height: 40rpx;
    letter-spacing: 2rpx;
    margin-top: 40rpx;
    text-align:center
}
.modal-dialog h3{
    font-size: 32rpx;
    text-align: center;
    line-height: 50rpx;
}
.content img{
    width: 350rpx;
}
.modal-dialog button{
    width: 450rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: white;
    border-radius: 40rpx;
    background: #c42220;
    margin: 40rpx auto;
    letter-spacing: 4rpx;
}
</style>
