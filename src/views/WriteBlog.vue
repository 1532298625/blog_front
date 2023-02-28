<template>
 <el-main style="padding-top: 5rem">
   <div>

     <el-form  :inline="true" :model="articleParams" :rules="rules" ref="articleParams" label-width="100px" class="demo-ruleForm">
       <el-form-item>
         <el-button size="large"  @click="openDialog" type="primary" round>发布文章</el-button>
       </el-form-item>

       <div id="main">
         <mavon-editor  ref=md @imgAdd="imgAdd" @imgDel="imgDel" v-model="articleParams.content"/>
       </div>
     </el-form>
   </div>

 </el-main>
  <el-dialog
      v-model="publishVisible"
      title="发布文章"
      width="50rem"
      height="100rem"
      :label-position="top"
      :before-close="handleClose">
    <el-form :model="articleParams" ref="articleParams" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input  placeholder="文章标题" size="large" v-model="articleParams.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="category">
        <el-checkbox-group v-model="articleParams.category">
          <el-checkbox  v-for="c in categorys" :key="c.id" :label="c.id" :value="c.id">{{c.category}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>


      <el-form-item label="文章标签" prop="tags">
        <el-checkbox-group v-model="articleParams.tags">
          <el-checkbox v-for="t in tags" :key="t.id" :label="t.id" name="tags">{{t.tags}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <p>封面</p>
      <el-upload
          class="avatar-uploader"
          name="image"
          action="http://localhost:8081/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
      >
        <img v-if="articleParams.cover" :src="articleParams.cover" class="avatar">
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-form-item prop="summary">
        <el-input type="textarea"
                  v-model="articleParams.summary"
                  :rows="6"
                  placeholder="请输入摘要">
        </el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="publishVisible = false">取消</el-button>
        <el-button type="primary" @click="publish">发布</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>

import {upload} from "@/api/upload";
import {addArticle,edit} from "@/api/ArticleApi";
import Dialog from "@/components/Dialog";
import {loadTags} from "@/api/tagsApi";
import {articleList} from "@/api/ArticleApi";
import {loadCategories} from "@/api/categoryApi";
import {login} from "@/api/loginApi";
import {getArticleById} from "@/api/ArticleApi";

export default {
  name: "WriteBlog",
  components:{
    Dialog,
  },
  data(){
    return{
      publishVisible: false,

      // markdown编辑器
      articleParams: {
        id:"",
        title: "",
        summary: "",
        content: " ",
        cover: "",
        contentHtml: " ",
        categoryId: [],
        category:[],
        tagsId: [],
        tags:[],
        user:{}
      },
      isEdit:false,
      categorys:[],
      tags:[],
      rules: {
        summary: [
          {required: true, message: '请输入摘要', trigger: 'blur'},
          {max: 80, message: '不能大于80个字符', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请选择文章分类', trigger: 'change'}
        ],
        tags: [
          {type: 'array', required: true, message: '请选择标签', trigger: 'change'}
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'change'}
        ]
      },
    }
  },
  mounted() {
    this.edit();
  },
  methods:{
   async imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      let res =await upload(formdata);
   console.log(res.data)
     if (res.code == 200) {
       this.$refs.md.$img2Url(pos, res.data)
     }
    },
    async loadTag() {
      let res = await loadTags();
      console.log(res)
      if (res.code == 200) {
        this.tags = res.data;
      }
    },
    async loadcategory() {
      let res =await loadCategories();
      console.log(res)
      if (res.code == 200) {
        this.categorys = res.data;
      }
    },
    openDialog(){

      this.publishVisible= true
     this.articleParams.contentHtml = this.$refs.md.d_render
        this.loadcategory();
        this.loadTag();

    },
    async publish(){

      console.log("11");
      this.$refs.articleParams.validate(async (vaild) => {
        if (vaild) {
          this.articleParams.categoryId = this.articleParams.category
          this.articleParams.tagsId = this.articleParams.tags;
          if (!this.isEdit) {
            let res = await addArticle(this.articleParams);
          }else {
            let res = await edit(this.articleParams);
          }
          if (res.code == 200) {
            this.publishVisible = false;
            this.articleParams = {};
          }
          this.$router.push("/")
          this.$router.go(1)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
     console.log(res)
      console.log(file)
      this.articleParams.cover = res.data;
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isLt2M;
    },
   async edit() {
      if (this.$route.query.articleId != null) {
        this.isEdit = true;
        let res =await getArticleById(this.$route.query.articleId)
        if (res.code == 200) {
          this.articleParams = res.data
          this.publishVisible = false;
          console.log(res.data)
          console.log("编辑",this.articleParams)
        }

      }
    },
  },


}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #8c2a2a;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
