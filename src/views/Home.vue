<template>
<!--<nav-bar style="position: fixed"></nav-bar>-->
  <div class="body">
    <el-row :gutter="2" justify="space-evenly" class="el-row">
      <el-col :xs="1"  :md="4" :lg="3" :xl="3">
        <div class="left-content bg-purple-light">
         <div>
           <span class="bannerTitle">首页</span>
         </div>
          <el-divider></el-divider>

          <div class="category" v-for="category in categoryList" :key="category.id">
            <p  class="active"  @click="categoryDetail(category.id)">
              <span style="font-size: 1.2rem;font-weight: 600;vertical-align:middle" ><el-icon ><CollectionTag /></el-icon></span>
              <span style="padding-left: 1.5rem">{{category.category}}</span>
            </p>
          </div>
          <el-divider></el-divider>
         <div class="tags" v-for="tag in tagList" :key="tag.id">
           <p class="active" @click="tagDetail(tag.id)">
             <span style="font-size: 1.2rem;font-weight: 600"><i>#</i></span>
             <span style="padding-left: 1.5rem">{{tag.tags}}</span>
           </p>
         </div>
      </div>
      </el-col>

      <el-col :xs="24" :sm="17" :md="13" :lg="14" :xl="11"  >
        <div  class="grid-content bg-purple-light mainContainer">
          <!-- v-infinite-scroll="getArticles" -->
          <div style="height: calc(100% - 40px);overflow: auto;">
            <Article :articleData="articleList"></Article>
          </div>
        <div style="display: flex;align-items: center;justify-content: center;padding-right: 10px;">
          <el-pagination
          v-model:current-page="PageParams.page"
          v-model:page-size="PageParams.pageSize"
          :page-sizes="[1,10, 20, 30, 40,50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="getArticles"
          @current-change="getArticles"
        />
        </div>
        </div>
      </el-col>

      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" class="hidden-xs-only">
        <div class="grid-content bg-purple-light">
          <div>
            <span class="bannerTitle">热门文章</span>
          </div>
          <el-divider></el-divider>
          <div>
            <p class="hotarticle" v-for="hot in hotArticle" :key="hot.id" @click="getDetail2(hot.id)">
              <span style="display:inline-block; width: 200px;">{{hot.title}}</span>
              <span style="display:inline-block; width: 80px;">浏览量:{{hot.viewCounts}}</span>
            </p>

          </div>
          <div class="divider"></div>
          <!-- <el-divider></el-divider> -->
          <div>
            <span class="bannerTitle">热门文章</span>
          </div>
          <el-divider></el-divider>
          <div>
            <p class="hotarticle" v-for="hot in hotArticle" :key="hot.id" @click="getDetail2(hot.id)">
              <span style="display:inline-block; width: 200px;">{{hot.title}}</span>
              <span style="display:inline-block; width: 80px;">浏览量:{{hot.viewCounts}}</span>
            </p>

          </div>
        </div>
        

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Article from "@/components/ArticleItem";
import {loadCategories} from "@/api/categoryApi";
import {loadTags} from "@/api/tagsApi";
import {articleList,hotArticle} from "@/api/ArticleApi";
import {getUser} from "@/api/loginApi";

import {mapState,mapMutations} from 'vuex'
export default {
  components:{Article},
  data(){
    return{
      tagList:[],
      categoryList:[],
      articleList:[],
      PageParams:{
        keyword:"",
        page:1,
        pageSize:20,
        categoryId:'',
      },
      total: 0,
      hotArticle:[]
    }
  },
  computed:{
    getKeyWord(){
      return this.$store.state.keyword;
    }
  },
  watch:{
    getKeyWord(newVal,oldVal){
      console.log(newVal,oldVal)
      this.PageParams.keyword = newVal;
      this.getArticles();
    },
    $route () {
	      if(this.$route.params.refresh){
	        this.getList() //重新调用http请求实现页面的重新渲染
	      }
	    }
  },
  mounted() {
    this.loadTag();
    this.loadcategory();
    this.getArticles();
    this.getUserInfo();
    this.getHot();
  },
  methods:{
   async loadTag() {
     let res = await loadTags();
     if (res.code == 200) {
       this.tagList = res.data;
     }
   },
    // getMoreArticle(){
    //   console.log("触底加载")
    //  this.PageParams.page = this.PageParams.page+1;
    //  this.getArticles();
    // },
    async getHot() {
     let res = await hotArticle();
      if (res.code == 200) {
        this.hotArticle = res.data
      }
    },
     async getArticles() {
      console.log(this.PageParams)
       let res =await articleList(this.PageParams);
       // console.log(res)
       if (res.code == 200) {
         this.articleList = res.data.articleData;
        this.total = res.data.num
       }
    },
    async loadcategory() {
      let res =await loadCategories();
      // console.log(res)
      if (res.code == 200) {
        this.categoryList = res.data;
      }
    },
    tagDetail(id){
      this.PageParams.tagId = id;
      this.getArticles();
      this.PageParams.tagId = '';
      console.log(id)
    },
    categoryDetail(id){
     this.PageParams.categoryId = id;
     this.getArticles();
     this.PageParams.categoryId = '';
     console.log(id)
    },
    async  getUserInfo(){
      let res= await getUser();
      console.log(res.data)
      if(typeof(res.data)!="undefined"){
        localStorage.setItem("user",JSON.stringify(res.data))
        this.$store.commit('setUserInfo',res.data)
      }
    },
    getDetail2(id) {
      console.log(id);
      this.$router.push({name: 'articledetail', query: {'articleId': id}})
    },
  }
}
</script>

<style scoped>
.active:hover {
  cursor: pointer;
  color: #05a6f0;
}
.body{
  padding: 5.2rem 4.5rem 0;

}
.mainContainer{
  /*height: 20rem;*/
  margin: 0;
  padding: 0;
}
/*@media screen and (max-width: 550px) {
  .mainContainer {
    width: 30rem;
    padding: 0 0rem;
    !*margin: 0 -1rem;*!
  }*/
/*}*/
.bannerTitle{
  font-size: 1.5rem;
  font-weight: 800;
  position: relative; 
  top: 12px;
  left: 2rem;
  /* padding: 2rem; */
}
.bg-purple-light {
  /*background: #e5e9f2;*/
  background: white;
  height: 100%;
}
.grid-content {
  border: 1px solid #d8dadc;
  border-radius: 4px;
  height: calc(100vh - 100px);
}
.left-content{
  border: 1px solid #d8dadc;
  border-radius: 4px;
  padding-bottom: 10px;
  height: auto;
}
.category{
  padding-left: 1.7rem;
}
.tags{
  font-size: 0.92rem;
  padding-left: 1.7rem;
}
.hotarticle span{
  padding-left: 1.2rem;
  cursor: pointer;
  color: #05a6f0;
}
.hotarticle:hover{
  text-decoration-line: underline;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
.divider{
  background-color: #f4f4f4;
  height: 10px;
}

</style>
