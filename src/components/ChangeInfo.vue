<template>
    <el-dialog v-model="show" width="500px" title="修改信息">
        <el-form :mode="userInfo" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="userInfo.nick_name"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
                <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="userInfo.phonenumber"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select style="width: 100%;" v-model="userInfo.sex">
                    <el-option v-for="(item,index) in ['男','女','未知']" :key="item" :value="index + ''" :label="item">{{ item }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8081/upload"
                    :show-file-list="false"
                    name="image"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <div style="text-align: right;">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="show = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import {ref,reactive} from 'vue'
import { getUser,changeInfo } from "../api/loginApi"
import {ElMessage} from "element-plus";
const show = ref(false)
const emit = defineEmits('onsuccess')
const userInfo = reactive({
    nick_name: '',
    email: '',
    phonenumber: '',
    sex: '',
    avatar:''
})
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  }
  return true
}
const handleAvatarSuccess = res => {
    userInfo.avatar = res.data
}
const confirm = async () => {
    // console.log(userInfo)
    await changeInfo(userInfo)
    ElMessage.success('修改成功')
    emit('onsuccess')
    show.value = false
}
const open = async () => {
    try{
        const res = await getUser()
        userInfo.nick_name = res.data.nickName
        userInfo.email = res.data.email
        userInfo.phonenumber = res.data.phonenumber
        userInfo.sex = res.data.sex
        userInfo.avatar = res.data.avatar
    }catch(e){
        console.log(e)
    }
    show.value = true
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
