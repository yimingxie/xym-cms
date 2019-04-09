<template>
  <div id="login">
    <div class="login-content">
      <div class="login-title">登录</div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <button @click="requestBtn">发送请求</button>
    </div>
  </div>
</template>

<script>

  import cookie from '../utils/cookie'
  // import {requestLogin} from '../api/user'
  import api from '../api/api'

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          pass: '',
          checked: true
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
      api.test.lineChart2().then(res => {
        console.log(res)
      })
  

    },
    methods: {
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (true || valid) {
            // 发送请求
            // if (this.ruleForm.checked) {
            //   // 存储cookie
            //   cookie.set('username', this.ruleForm.name)
            //   cookie.set('password', this.ruleForm.pass)
            // }
            // this.requestBtn()

            this.$axios.get('/api/user/login').then(res => {
              console.log(res)
              cookie.set('user-token', res.data.result.token)
              this.$router.push('/index')
            })

            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // 自动添加账号密码

      // 登录
      requestBtn() {
        requestLogin().then(data => {
          // 拿到的data已经是token对象了
          localStorage.setItem('user-token', JSON.stringify(data.result.token))
          this.$message({
            message: '登录成功，token:' + data.result.token,
            type: 'success'
          })
//          this.$router.push('/home')
          this.$router.push({path:decodeURIComponent(url)})
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #login{
    .login-title{
      font-size: 26px;
      font-weight: bold;
      margin: 20px;
      text-align: center;
    }
    .login-content{
      width: 600px;
      margin: 150px auto 0;
      border: 1px solid #000;
      padding: 20px;
    }

  }
</style>
