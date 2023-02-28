<template>

     <div class="articleInfo">
<!--       {{article}}-->
       <h1 class="title">{{article.title}}</h1>
       <p class="info">

         <span>  {{category.category}}</span>
         <span>{{article.createDate}}</span>
         <span>{{article.viewCounts}}阅读</span>
         <span>{{article.likenum}}喜欢</span>
         <span>{{article.commentCounts}}评论</span>
       </p>
       <div class="commentContainer">
         <div><el-avatar :src="user.avatar"></el-avatar></div>
         <div style="margin-left: 0.7rem">
           <div class="userName">{{user.nickName}}</div>
           <div class="userinfo">
             <span>粉丝：17</span>
             <span>文章：100</span>
           </div>
         </div>
       </div>
     </div>
      <el-divider></el-divider>
      <div class="articleContext">
        <div class="txt">
<!--             {{article.contentHtml}}-->
        <p  v-html="article.contentHtml"></p>
        </div>
        <p class="info">
          <span>本文为我原创 &nbsp &nbsp本文禁止转载或摘编</span>
          <br>
          <br>
          <el-icon style="vertical-align: middle;margin-right: 0.8rem"><Medal /></el-icon>
          <span  v-for="category in article.categoryList" :key="category.id">
            <span>{{ category.category }}</span>
          </span>
          <span  v-for="tags in article.tagsList" :key="tags.id">
            <span>{{ tags.tags }}</span>
          </span>
        </p>
      </div>

</template>

<script>
import {getArticleById} from "@/api/ArticleApi";

export default {
  name: "ArticleDeatil",
  props:[],
  data() {
    return{
      article:{},
      user:{},
      category:{}
    }
  },
  computed:{
    author() {
      return this.article.user;
    },
  },
  mounted() {
    // console.log(this.context)
    // console.log(this.article)
    this.getArticel();
  },
  methods:{
   async getArticel() {
     let res = await getArticleById(this.$route.query.articleId)
     if (res.code == 200) {
       this.article = res.data
       this.user = res.data.user
       this.category = res.data.categoryList[0]
     }

    },
  }
}
</script>

<style scoped>

.container{
  padding:  1rem 5rem;
  margin: 0 auto;
  background: white;
  width: 55rem;
  /*height: 200rem;*/
}
.title{
  /*text-align: center;*/
  /*line-height: 6rem;*/
}
.txt{
  line-height: 1.9rem;
  font-size: 1.21rem;
  text-align: justify;
}
.txt >>>img{
  width: 44.85rem;
  height: 29.92rem;
  padding: 1rem 4.5rem;

}
.info span{
  font-size: 0.9rem;
  padding-right: 0.8rem;
  color: #99a2aa;
}
.commentContainer{
  display: flex;
}
.content{
  padding-top: 8px;
}
.userName{
  /*font-weight: bold;*/
  font-size: 1rem;
  color: #222;
}
.info{
  font-size: 0.95rem;
  color: #99a2aa;
  padding: 0;
}

.userinfo span{
  font-size: 0.9rem;
  padding-right: 1.2rem;
  color: #99a2aa;
}
</style>