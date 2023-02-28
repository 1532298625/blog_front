<template>
    <div class="from-container">
<!--      <img src="https://lds-blog.oss-cn-hongkong.aliyuncs.com/BLOG-APP/images/2022-05-27/16d3d410-04ee-45b0-b2e5-f6a82ff53186.jpg" alt="6bb236979f9b72c60cad5859390537d4.jpg" />-->
      <p class="title">注册账号</p>
      <el-form  :model="LoginParams" ref="LoginParams" size="large" :rules="rules" :label-position="top">
        <el-form-item
            prop="nickName">
          <el-input placeholder="昵称" v-model="LoginParams.nickName" />
        </el-form-item>

        <el-form-item
            prop="email">
          <el-input placeholder="邮箱" v-model="LoginParams.email" />
        </el-form-item>

        <el-form-item  prop="pass">
          <el-input placeholder="密码" type="password" v-model="LoginParams.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
          <el-input placeholder="确认密码"  v-model="LoginParams.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="code">
          <el-input class="code" placeholder="验证码" v-model.number="LoginParams.code"></el-input>
          <el-button class="codeBtn" type="info" @click="getcode()">获取验证码</el-button>
        </el-form-item>

        <el-form-item >
          <el-button class="submitBtn" type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import {register,getCode} from "@/api/loginApi";

export default {
  name: "Register",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.LoginParams.checkPass !== '') {
          this.$refs.LoginParams.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.LoginParams.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      LoginParams: {
        nickName: "",
        email: '',
        password: '',
        checkPass: "",
        code: ''
      },
      //表单区域

      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        code: [
          {required: true,message: '验证为5位数的数字',trigger: 'blur'}
        ],
        nickName: [
          {required: true,message: '昵称不能为空',trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],

      },
    };
  },
  methods: {
    async getcode(){
      try {
        await getCode(this.LoginParams); 
      } catch (error) {
        this.$message.error('验证码发送失败')
      }
      console.log(res)
    },
    async  submitForm() {
      this.$refs.LoginParams.validate(async (vaild) => {
        if (vaild) {
          let res =await register(this.LoginParams);
          console.log(res)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.container{
  margin: 0 auto;
  padding-top: 8rem;
  width: 25rem;
}
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
</style>
