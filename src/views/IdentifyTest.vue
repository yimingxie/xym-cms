<template>
  <div>
    <h1>canvas验证码</h1>
    <input type="text" v-model="checkCode" placeholder="验证码">
    <div class="code" @click="refreshCode">
      <s-identify :identifyCode="identifyCode" ref="identify"></s-identify>
    </div>
    <button @click="submit">提交</button>
  </div>

</template>

<script>
  // 引入验证码
  import SIdentify from '../components/Identify.vue'

  export default {
    name: "codetest",
    data() {
      return {
        identifyCodes: "1234567890",
        identifyCode: "4",
        checkCode: '',
      };
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      // 产生随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

      // 更新验证码
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },

      // 产生验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
      },

      // 校验
      submit() {
        if (this.checkCode == this.identifyCode) {
          alert('验证成功')
        } else {
          alert('验证失败')
        }
      }
    },
    components: {
      "s-identify": SIdentify
    }
  };
</script>

<style>
  /*.code {*/
    /*margin: 400px auto;*/
    /*width: 114px;*/
    /*height: 40px;*/
    /*border: 1px solid red;*/
  /*}*/
</style>
