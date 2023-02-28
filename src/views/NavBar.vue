<template>
   <div class="navbar">
     <el-row :gutter="0" class="nav-height"  justify="space-around">
       <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="2">
         <div class="">
           <router-link to="/" active-class="active">
             <i>logo</i>
           </router-link>
         </div>
       </el-col>
       <el-col :xs="0" :sm="10" :md="10" :lg="10" :xl="1"  class="hidden-xs-only">
         <div class="" style="display: flex;">
           <router-link to="/" active-class="actice">
             <span class="nav_item">首页</span>
           </router-link>
           <span @click="showFeedback" class="nav_item">反馈</span>
           <router-link to="sugesst" active-class="active">
             <span class="nav_item" v-show="role==='user'">反馈信息</span>
           </router-link>
           <router-link to="writeBlog" active-class="active">
             <span class="nav_item" v-show="role!=='user'">写文章</span>
           </router-link>
         </div>
       </el-col>
       <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
         <div class="">
           <el-input v-model="text" class="input" placeholder="搜索内容" @keyup.enter="search">
             <template #prefix>
               <el-icon class="el-input__icon"><search /></el-icon>
             </template>
           </el-input>
         </div>
       </el-col>
       <el-col :xs="6" :sm="4" :md="4" :lg="5" :xl="1">
         <div class="">
           <el-row v-if="userInfo != null">
               <div style="display: flex; align-items: center;">
              <el-avatar style="margin-top: 0.4rem" :src="userInfo.avatar"></el-avatar>
              <el-dropdown style="margin-left: 0.2rem;">
                <span class="el-dropdown-link">
                  {{ userInfo.nickName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="changeInfo">信息修改</el-dropdown-item>
                    <el-dropdown-item @click="changePassword">密码修改</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
               <!-- <span >{{userInfo.nickName}}</span>
                 <span></span>
                 <span style="margin-left: 2rem;cursor: pointer;color: #05a6f0" @click="logout">退出登录</span> -->
             </div>
           </el-row>
           <el-row v-if="userInfo == null">
             <el-col :xs="5" :sm="8" :md="8" :lg="8" :xl="8"> <div class="login" >
               <el-button  size="default" @click="toLoginPage"> 登录/注册</el-button>
             </div></el-col>
           </el-row>
         </div>
       </el-col>
     </el-row>
   </div>
   <change-info @onsuccess="getUserInfo" ref="ChangeInfo" />
   <ChangePassword ref="ChangePassword"/>
</template>

<script>
import {logout,getUser} from "@/api/loginApi";
import {ElMessage} from "element-plus";
import ChangeInfo from "../components/ChangeInfo.vue";
import ChangePassword from "../components/ChangePassword.vue";
export default {
  name: "NavBar",
  data() {
    return{
      userInfo:this.$store.state.user,
      text:"",
      role:window.localStorage.getItem("role")
    }
  },
  components:{ChangeInfo,ChangePassword},
  props:['emails'],
  methods:{
    toLoginPage(){
      this.$router.push("/login")
    },
     logout() {
        logout();
        window.localStorage.clear();
        window.localStorage.setItem("role","user")
        this.$router.go(0)
    },
    changeInfo(){
      this.$refs.ChangeInfo.open()
    },
    changePassword(){
      this.$refs.ChangePassword.open()
    },
    search(){
      this.$store.commit('setKeyWords',this.text)
    },
    async  getUserInfo(){
      let res= await getUser();
      if(typeof(res.data)!="undefined"){
        localStorage.setItem("user",JSON.stringify(res.data))
        this.$store.commit('setUserInfo',res.data)
      }
    },
    showFeedback(){
      
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.role = window.localStorage.getItem("role")
      this.userInfo = this.$store.state.user
    }, 1000);
  },
  watch(){
    userInfo:{
      deep:true
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
.el-dropdown-link{
  white-space: nowrap;
}
.navbar {
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 6rem;
  background-color: #fff;
  box-shadow: 0 5px 5px rgb(0 0 0 / 5%);
  height: 3.57rem;
  z-index: 99;

}
.nav-height{
  line-height: 3.75rem;
}
.nav_item {
  white-space: nowrap;
  margin-right: 4.5rem;
}
.input {

  width: 60%;
  border-radius: 50%;
}

.login button{
  border: none;
  color: #05a6f0;
  background: none;

}
.login button:hover{
  background: none;
}

@media screen and (max-width: 1040px) {
  .navbar{
    padding: 0;
    margin: 0;
  }
  .input {
    width: 80%;
    border-radius: 50%;
  }

}
@media screen and (max-width: 769px) {
  .navbar {
    padding: 0;
    margin: 0;
  }
  .body{
    padding: 5rem 0;
  }
  .input {
    width: 100%;
    border-radius: 50%;
  }

}
@media screen and (max-width: 550px) {
  .navbar {
    padding: 0 0rem;
    margin: 0;
  }
}
</style>
