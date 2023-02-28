<template>
  <el-main  style="padding-top: 5.5rem;">
    <div class="container">
   <ArticleDeatil :article="articleData"></ArticleDeatil>
    </div>
    <div style="margin-top: 2rem" class="container">
      <p style="font-size: 1.3rem">{{articleData.commentCounts}} 评论</p>
      <comment-commit :isVisble="true" :articles="articleData.id"></comment-commit>
      <Comment
          v-for="comment in commentData" :key="comment.id"
          :comments = "comment">
      </Comment>
    </div>
  </el-main>
</template>

<script>
import ArticleDeatil from "@/components/ArticleDeatil";
import Comment from "@/components/Comment";
import commentCommit from "@/components/CommentCommit";
import {listComments} from '../api/commentApi'
import {getArticleById} from "@/api/ArticleApi";

export default {
  name: "articleDetail",
  components:{
    Comment,
    ArticleDeatil,
    commentCommit,
  },
  data() {
    return{
      articleData:{},
      commentData:[],
    }
  },
  computed:{

  },
  mounted() {
    this.getComments();
    this.getArticle();
  },
  methods: {
   async getArticle(){
    let res =await getArticleById(this.$route.query.articleId)
     if (res.code == 200) {
       this.articleData = res.data
     }
    },
    async getComments() {
      let res = await listComments(this.$route.query.articleId);
      if (res.code == 200) {
        // console.log("子评论", res.data[0].subComment.nickname)
        this.commentData = res.data
      }
    }
    },
}
</script>

<style scoped>
.container{
  padding:  1rem 5rem;
  margin: 0 auto;
  background: white;
  width: 55rem;
}
</style>