<template>
  <div class="info-form">
    <el-form ref="ruleFormRef" :model="userStore.registerUserInfo" :rules="rules" :label-width="80">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userStore.registerUserInfo.username" size="large" placeholder="请输入您的用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userStore.registerUserInfo.email" size="large" placeholder="请输入你的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userStore.registerUserInfo.password" size="large"
                  placeholder="请输入你的密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" v-model="userStore.registerUserInfo.repassword" size="large"
                  placeholder="请再次输入你的密码"></el-input>
      </el-form-item>
      <el-button type="danger" size="large"
                 style="width: 90%;margin: 6% 8%"
                 @click="submitStep2(ruleFormRef)">注册
      </el-button>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import type {FormInstance, FormRules} from "element-plus";

const userStore = useUserStore()


const submitStep2 = (formRules: FormInstance | undefined) => {
  if (!formRules) return
  formRules.validate((valid, fields) => {
    if (valid) {
      if (userStore.verifyStep2()) {
        // 如果登录信息有误在登录方法内会提示，这里只做正确的处理
        userStore.curRegisterStep = (userStore.curRegisterStep + 1) % 3
      }
    } else {
      return false
    }
  })
}

const validatePassCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== userStore.registerUserInfo.password) {
    callback(new Error('两次输入的密码不一样'));
  } else {
    callback();
  }
};

const ruleFormRef = ref<FormInstance>()   // 密码登录
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
    {type: 'string', min:8,max:16, message: '用户名长度在8~16位之间', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '邮箱不能为空', trigger: 'blur'},
    {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur'}
  ],
  repassword: [
    {required: true, message: '重复密码不能为空', trigger: 'blur'},
    {validator: validatePassCheck, trigger: 'blur'}
  ]
})

</script>
<style lang="less" scoped>
.info-form {
  padding-top: 10%;
  margin-left: 10px;
  width: 90% !important;
}
</style>
