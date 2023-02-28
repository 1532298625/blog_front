<template>
  <el-main style="padding: 3.5rem 0" class="container" v-if="isVisble" >
<!--    头像-->
    <div class="user">
      <span><el-avatar src="https://space.bilibili.com/454286556"></el-avatar></span>
    </div>
    <div class="txt">
      <el-input style="width: 37rem;margin-right: 1rem" type="textarea" :rows="3" :placeholder="placeholder" v-model="comment.content"></el-input>
    </div>
    <div class="submit">
      <el-button @click="addComment()" size="large" type="primary">发表评论</el-button>
    </div>
  </el-main>
</template>

<script>
import {addComment} from "@/api/commentApi";
import {ElMessage} from "element-plus";

export default {
  name: "CommentCommit",
  props:["isVisble","articles"],
  data(){
    return{
      comment:{
        articleid:'0',
        content:'',
        parentid:'0',
      },
      test:this.articles,
      placeholder:'发一条有善的评论'
    }
  },
  methods:{
  async  addComment(){
    console.log(this.comment.articleid)
    if (this.articles != null) {
      this.comment.articleid =this.articles
    }
    if (this.$store.state.user == null) {
     ElMessage.error("未登录")
      return;
    }
    let res = await addComment(this.comment);
    if (res.code == 200) {
      this.$router.go(0)
    }
    },

    showInput(comment){
      if (!comment.id == "0") {
        this.comment.articleid = comment.articleid;

        this.comment.parentid = comment.id;
      }
       this.placeholder = "回复 @"+comment.nickname;

    },


  }
}
</script>

<style scoped>
.container{
  display: flex;
}.container div{
   margin-left: 15px;
 }
.container div:first-child{
  margin-left: 5px;
}
.txt {
  width: 380px;
}
.submit button{
  width: 72px;
  height: 72px;
  /*padding: 0 10px;*/
  margin-left: 10rem;
}
</style>