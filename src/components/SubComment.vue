<template>
<!--  {{subComment}}-->
  <div  style="padding-top: 10px">
    <div class="commentContainer">
      <div><el-avatar :src="subComment.avatar"></el-avatar></div>
      <div style="margin-left: 20px">

<!--        给楼主回复的评论-->
        <div class="user">
          <span class="userName">{{subComment.nickname}} </span>
            <!--        回复的人不是楼主-->
          <span  v-if="subComment.parentid != commentId"> 回复 <span style="color:deepskyblue;"> @ {{toUser.nickName}}</span></span>
          <span class="content">{{subComment.content}}</span>
          <div class="info">
            <span>2022-04-26 08:16</span>
            <span @click="likeComments(subComment.id)" style="cursor: pointer">赞 {{subComment.likenum}}</span>
            <span>踩</span>
            <span @click="subCommentReply(subComment)" style="cursor: pointer">回复</span>
            <span v-if=" this.$store.state.user != null">
            <span v-if=" userInfo.id == subComment.userid">

                 <el-popconfirm title="确定删除吗"  @confirm="confirmDelete(subComment.id,subComment.userid)">
              <template #reference>
                  <span  style="color: #05a6f0;cursor: pointer">
               删除
          </span>
              </template>
            </el-popconfirm>
            </span>
            </span>
          </div>
        </div>

      </div>
    </div>

      <sub-comment
          v-for="subComments in subComment.subComment"
          :key="subComments.id"
          :subComment="subComments"
          :comment-id="commentId">
      </sub-comment>
  </div>
</template>

<script>
import {likeComment,delComment} from "@/api/commentApi";
import {delArticleById} from "@/api/ArticleApi";

export default {
  name: "SubComment",
  props:["subComment","commentId"],
  data() {
    return{
      userInfo:this.$store.state.user,
      toUser:{},
    }
  },
  mounted() {
    this.getSubComments();
    if (this.subComment.toUser != '') {
      this.toUser = this.subComment.toUser
    }
  },
  methods:{
  getSubComments(){

    },
      async likeComments(commentid) {
       let res = await likeComment(commentid)
          this.$router.go(0)

    },
    subCommentReply(comment){
      console.log("我是子组件")
      this.$emit('reply',comment)
      console.log("我是子组件二")
    },
    async  confirmDelete(commentId) {
      console.log(commentId)
        let res = await  delComment(commentId );
      this.$router.go(0)

    },
  }
}
</script>

<style scoped>
.commentContainer{
  display: flex;
}
.content{
  padding: 15px;
}
.userName{
  font-weight: bold;
  font-size: 13px;
  color: #222;
}
.info{
  padding-top: 8px;
  font-size: 12px;
  color: #99a2aa;
}

.info span:first-child{
  padding-left:0;
}
.info span{
  padding-left:20px;
}
.more {
  margin-left: 50px;
  transform:rotate(90deg);
  cursor: pointer;
}
</style>