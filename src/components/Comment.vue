<template>
  <div >
  <el-main style="padding: 0">
    <el-divider style="margin: 0.6rem auto"/>
    <div class="commentContainer">
      <div><el-avatar src="https://space.bilibili.com/454286556"></el-avatar></div>
      <div style="margin-left: 20px">
        <div class="userName">{{comment.nickname}}</div>
        <div class="content">{{comment.content}}</div>
        <div class="info">
          <span>2022-04-25 08:16</span>
          <span @click="likeComments(comment.id)"
                style="cursor: pointer">赞 {{comment.likenum}}</span>
          <span>踩</span>
          <span @click="replyComment(comment)" style="cursor: pointer">回复</span>
          <span v-if=" this.$store.state.user != null">
            <span v-if="userInfo.id == comment.userid">
                 <el-popconfirm title="确定删除吗"  @confirm="confirmDelete(comment.id,comment.userid)">
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
<!--    <slot :subComments="comment.subComment"></slot>-->
    <div style="padding:0px 4rem">
      <sub-comment
          v-for="subComments in comment.subComment"
          :key="subComments.id"
          @reply="replyComment"
          :subComment="subComments"
          :comment-id="comment.id">
      </sub-comment>
    </div>
    <div class="view-more">
      <span>共{{comment.replynum}}条回复, </span>
      <span style="color:deepskyblue;">点击查看</span>
    </div>
  </el-main>
    <comment-commit :isVisble=isVisble ref="show"></comment-commit>
  </div>
</template>
<script>
import subComment from "@/components/SubComment";
import commentCommit from "@/components/CommentCommit";
import {delComment, likeComment} from "@/api/commentApi";

export default {
  name: "Comment",
  components:{
    subComment,
    commentCommit
  },
  props:["comments"],
  mounted() {
    this.getComment();
  },
  data(){
    return{
      userInfo:this.$store.state.user,
      comment:this.comments,
      // 回复框
      isVisble:false,
      key:'',
    }
  },
  methods: {
    getComment() {


    },
    reply(val){
      console.log(val)
      console.log("子调父")
    },
    replyComment(comment) {
      this.isVisble = !this.isVisble;
      this.$refs.show.showInput(comment);
      console.log("子调父")
    },

    async likeComments(commentid) {
      let res = await likeComment(commentid);
        this.$router.go(0)

    },
    async  confirmDelete(commentId) {
      console.log(commentId)
      let res = await  delComment(commentId );
      this.$router.go(0)

    },
    test(commentId){
      alert("222")

    }
  }
}
</script>

<style scoped>
.commentContainer{
  display: flex;
}
.content{
  padding-top: 8px;
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
.view-more{
  margin: 8px 65px;
  font-size: 13px;
  color: #99a2aa;
}
.more {
  margin-left: 50px;
  transform:rotate(90deg);
  cursor: pointer;
}
</style>