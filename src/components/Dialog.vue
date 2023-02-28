<template>
  <el-dialog
      v-model="visible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select  placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {loadTags} from "@/api/tagsApi";
import {articleList} from "@/api/ArticleApi";
export default {
  // props:["visible"],
  data() {
    return {
      publishVisible: true,
      formLabelWidth: '120px'

    };
  },
  methods:{
    async loadTag() {
      let res = await loadTags();
      console.log(res)
      if (res.code == 200) {
        this.tagList = res.data;
      }
    },
    async getArticles() {
      let res =await articleList(this.PageParams);
      console.log(res)
      if (res.code == 200) {
        this.articleList = res.data;
      }
    },
  }
};
</script>