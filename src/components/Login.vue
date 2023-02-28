<template>
    <div class="from-container">
      <p class="title">登 录</p>
      <el-form  :model="LoginParams" ref="LoginParams" size="large" :rules="rules" :label-position="top">

        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" v-model="LoginParams.email" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="LoginParams.password" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            type="text"
            placeholder="点击图片更换验证码"
            v-model="LoginParams.code"
            class="vertify_code"
            auto-complete="false"
            style="width: 17rem;"
          ></el-input>
          <!-- <span class="code">验证码</span> -->
          <img :src="imgUrl" @click="resetImg" class="vertify_img" />
        </el-form-item>
        <el-checkbox v-model="checked" class="remeberMe">记住我</el-checkbox>
        <el-form-item >
          <el-button class="submitBtn" type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import {login, getCode, getUser} from "@/api/loginApi";

export default {
  name: "Login",
  data() {
    return {
      LoginParams: {
        nickname: "",
        email: '',
        password: '',
        checkPass: "",
        code: ''
      },
      imgUrl: "http://localhost:8081/user/verifyCode?time=" + new Date(),
      //表单区域
      rules: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.account(); //获取cookie的方法
  },
  inject:['reload'],
  methods: {
    account() {
      console.log(this.getCookie("username"));
      this.LoginParams.email = this.getCookie("email");
      this.LoginParams.password = this.getCookie("password");
    },
    setCookie(c_email, c_pwd, exdate) {
      //账号，密码 ，过期的天数
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdate); //保存的天数
      document.cookie =
        "email=" + c_email + ";path=/;expires=" + exdate.toLocaleString();
      document.cookie =
        "password=" + c_pwd + ";path=/;expires=" + exdate.toLocaleString();
    },
    getCookie(name) {
      var arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },
    clearCookie() {
      this.setCookie("", "", -1); //清除cookie
    },
    async submitForm() {
      this.$refs.LoginParams.validate(async (vaild) => {
        if (vaild) {
          //取参数
          let params = new URLSearchParams();
          params.append("email", this.LoginParams.email);
          params.append("password", this.LoginParams.password);
          params.append("code", this.LoginParams.code);
          if (this.checked == true) {
            //存入cookie
            this.setCookie(this.LoginParams.email, this.LoginParams.password, 7); //保存7天
          } else {
            this.clearCookie();
          }
          let res =await login(this.LoginParams);
          if (res.code == 0) {
            this.$message.error('验证码错误');
          }
          if (res.code == 200) {
            //获取用户信息
            if (this.LoginParams.email == "1532298625@qq.com"){
              window.localStorage.setItem("role","admin")
            }
            this.$message({message: '登陆成功',type: 'success'})
            localStorage.setItem("access_token",res.data.token)
            this.$router.push({name: 'Home',  params:{refresh: true}})
            this.$router.go(1)
            this.reload()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //点击图片更换验证码
    resetImg() {
      this.imgUrl = "http://localhost:8081/user/verifyCode?time=" + new Date();
    },

  }
}
</script>

<style scoped>

.from-container{
  /*background-color: wheat;*/
}
.title{
  font-size: 1.5rem;
  text-align: center;
}
.submitBtn{
  margin: 0 auto;
  width: 14rem;
  height: 3rem;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 1rem;
}
.code{
  width: 10rem;
}
.codeBtn{
  margin-left: 2rem;
}
.vertify_img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 110px;
}
</style>