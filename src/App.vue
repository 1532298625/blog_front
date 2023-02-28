<template>
  <el-config-provider :locale="locale">
    <NavBar style="position: fixed;z-index: 99" :role="role"></NavBar>
    <router-view  v-if="isRouterAlive" :role="role"/>
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import NavBar from "@/views/NavBar";
import { L2Dwidget } from 'live2d-widget';
export default {
  name: "WriteBlog",
  data() {
    return {
      locale: zhCn,
      isRouterAlive: true,
      role:'user'
    }
  },
  components:{
    NavBar,
  },
  created() {
    setTimeout(() => {
      L2Dwidget.init({
        tagMode: false,
        debug: false,
        model: { jsonPath: 'https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/L2Dwidget/live2d-widget-model-haruto/assets/haruto.model.json' },
        display: { position: 'left', width: 150, height: 300 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  },
  mounted() {
    window.localStorage.setItem('role',"user")
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
}
</script>
<style>
html{
  font-size: 14px;
  width: 100%;
  height: 100%;
}
body{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding: 0;
  margin: 0;
  /*padding-top: 20rem;*/
 
}
a{
  color: #000;
   text-decoration-line: none;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}


} */


/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>


  
