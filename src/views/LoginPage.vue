<template>
 <div class="container">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="登录" name="first">
      <Login></Login>
    </el-tab-pane>
    <el-tab-pane label="注册" name="second">
      <Register  ></Register>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Register from "@/components/Register";
import Login from "@/components/Login";
export default {
  name: "LoginPage",
  components:{
    Register,
    Login,
  },
  props:['role'],
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
</style>