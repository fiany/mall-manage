<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt/>
      </div>
      <!-- 账号密码 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <el-input
                v-model="loginForm.imgValue"
                prefix-icon="iconfont icon-3702mima"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-image
                style="width: 100px; height: 40px"
                :src="'data:image/png;base64,' + captchaImageInfo.base64"
                @click="captchaImageFun"
              ></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="restLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { userInfoLogin, userLogin } from '@/api/user'
import { captchaImage } from '@/api/system'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        imgId: '',
        imgValue: ''
      },
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ],
        // 验证密码
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }]
      },
      captchaImageInfo: {
        base64: '',
        imgId: ''
      }
    }
  },
  methods: {
    // 重置表单数据
    restLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.loginForm.imgId = this.captchaImageInfo.imgId
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        await userLogin(this.loginForm)
        // 登录成功跳转到后台主页
        await this.$router.push('/home')
      })
    },
    async captchaImageFun() {
      const { data: res } = await captchaImage()
      this.captchaImageInfo.base64 = res.base64
      this.captchaImageInfo.imgId = res.imgId
    },
    async userInfoLogin() {
      const { code: resCode } = await userInfoLogin()
      if (resCode === 0) {
        // 能获取到用户信息可以直接跳转到首页
        // await this.$router.push('/home')
      }
    }
  },
  created() {
    this.userInfoLogin()
    this.captchaImageFun()
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 110px;
  width: 110px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
