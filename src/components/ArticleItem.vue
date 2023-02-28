<template>
  <div class="articleContainer" v-for="article in articleData" :key="article.id">
    <div>
      <h3 class="title" @click="getDetail(article.id)">{{ article.title }}</h3>
    </div>
    <div class="summary" @click="getDetail(article.id)">
      <div class="hidden-xs-only" v-if=" article.cover != '' ">
        <el-image
            :fit="contain"
            style="width: 13rem; height: 8rem;margin-right: 1.5rem"
            :src=article.cover>
        </el-image>
      </div>
      <div>
        <p
            style=" margin: 0">
          {{ article.summary }}
        </p>
      </div>
    </div>
    <div class="info">
      <p>
        <span>{{ article.user.nickName }}</span>
        <span>{{ article.likenum }} 点赞</span>
        <span>{{ article.commentCounts }} 留言</span>
        <span>{{ article.viewCounts }}人 阅读</span>
        <span>{{ article.updateTime }}</span>

<!-- {{ article.user.id}}-->
<!--      {{userInfo.id}}-->
        <span v-if="userInfo != null">
        <span v-if="article.user.id == userInfo.id">
          <el-dropdown>
                    <span style="cursor: pointer"> <el-icon><MoreFilled /></el-icon></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
          <el-popconfirm title="确定删除？" @confirm="confirmDelete(article.user.id,article.id)">
               <template #reference>
                 <span>删除</span>
                </template>
          </el-popconfirm>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="edit(article.id)">编辑</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
           </el-dropdown>
         </span>
          </span>
      </p>
    </div>
    <el-divider style="margin: 1.3rem 0"></el-divider>
  </div>
</template>

<script>
import {delArticleById} from "@/api/ArticleApi";

export default {
  name: "Article",
  props: ["articleData"],
  data() {
    return {
      userInfo:this.$store.state.user
    }
  },

  methods: {
    getDetail(id) {
      console.log(id);
      this.$router.push({name: 'articledetail', query: {'articleId': id}})
    },
 /*   confirmDelete(){
      console.log("2222")
    },*/
  async  confirmDelete(uid,articleId) {
    console.log(uid)
    console.log(this.userInfo.uid)
      if (uid == this.userInfo.id) {
        console.log("222")
      let res = await  delArticleById(articleId);
        this.$router.go(0)
      }
    },
    edit(id) {
      this.$router.push({name: 'writeBlog', query: {'articleId': id}})
    },

  }
}
</script>

<style scoped>

.articleContainer {
  padding: 1.5rem;
  padding-bottom: 0;
  /*height: 14.2rem;*/
  overflow: hidden;
}

.title {
  font-weight: bold;
  margin-bottom: 0;
  margin: 0;
}

.title:hover {
  cursor: pointer;
  color: #99a2aa;
}

.summary {
  overflow: hidden;
  padding-left: 10px;
  text-align: justify;
  max-height: 8.2rem;
  margin-top: 0.7rem;
  display: flex;
}

.summary:hover {
  cursor: pointer;
  color: #99a2aa;
}

.summary el-image {
  width: 1rem;
  height: 1rem;
}

.info p span {
  font-size: 0.9rem;
  padding-right: 1.5rem;
  color: #99a2aa;
}
</style>