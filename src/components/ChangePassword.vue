<template>
    <el-dialog v-model="show" width="500px" title="修改密码">
        <div style="margin-bottom: 4px;">新密码</div>
        <el-input type="password" v-model="password"></el-input>
        <div style="text-align: right;margin-top: 4px;">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="show = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {changePassword,logout} from '../api/loginApi'
import {ElMessage,ElMessageBox } from "element-plus";
import { useRouter } from 'vue-router';
const $router = useRouter()
const show = ref(false)
const password = ref('')
const open = async () => {
    password.value = ''
    show.value = true
}
const confirm = async () => {
    if(!password.value){
        ElMessage.error('请输入新密码')
        return
    }
    await changePassword(password.value)
    ElMessageBox.alert('密码修改成功，请重新登录', '提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确定',
    callback: () => {
        logout();
        window.localStorage.clear();
        window.localStorage.setItem("role","user")
        $router.go(0)
    }
})
}
defineExpose({
    open
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
