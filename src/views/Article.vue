<template>
  <comment-commit :isVisble="true"></comment-commit>
  <Comment
      v-for="comment in commentData" :key="comment.id"
      :comments = "comment">
  </Comment>
</template>


<script>
import {listComments} from '../api/commentApi'
import Comment from  '../components/Comment'
import SubComment from "@/components/SubComment";
import commentCommit from "@/components/CommentCommit";


export default {
  name: "Article",
  components:{
    Comment,
    SubComment,
    commentCommit,
  },
  data(){
    return{
      commentData:[],
    }
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async getComments() {
     let  res = await listComments("a1");

      this.commentData = res.data

    },
    test(){
      this.commentData.push(
          {
            "id": "6289ff9d804cba6b7b592a32",
            "articleid": "a1",
            "content": "年就开始补差价爽肤水哦爽肤水是否",
            "userid": "666",
            "nickname": "游客用户",
            "createdatetime": "2022-05-22T17:17:17.84",
            "likenum": 0,
            "replynum": 0,
            "state": "0",
            "parentid": "0",
            "whoLikeThisComment": null,
            "subComment": null
          }
      )
    },
  }
}
</script>

<style scoped>
.line span{
  padding: 0 8px;
}
</style>