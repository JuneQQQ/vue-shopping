<template>
  <el-form ref="ruleFormRef"
           :model="userStore.registerUserInfo"
           style="width: 90%;margin-top:10%"
           label-width="100px" :rules="rules">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="userStore.registerUserInfo.phone" size="large" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="userStore.registerUserInfo.code" size="large" placeholder="请输入验证码">
        <template #append>
          <el-button slot="append" @click="sendCode">获取验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-button type="danger"
               style="width: 90%;margin: 5% 12%"
               size="large"
               @click="submitStep1(ruleFormRef)">验证手机号
    </el-button>
  </el-form>
</template>
<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import type {FormInstance} from "element-plus";

const ruleFormRef = ref<FormInstance>()   // 用于表单校验
const submitStep1 = (formRules: FormInstance | undefined) => {
  if (!formRules) return
  formRules.validate((valid, fields) => {
    if (valid) {
      if (userStore.verifyStep1()) {
        // 如果登录信息有误在登录方法内会提示，这里只做正确的处理
        userStore.curRegisterStep = (userStore.curRegisterStep + 1) % 3  // 更新步骤
      }
    } else {
      return false
    }
  })
}
const sendCode = () => {
  userStore.registerUserInfo.code = Math.round(Math.random() * (100000)) + 99999  // dev
}
const userStore = useUserStore()
const rules = reactive<FormRules>({
  phone: [
    {required: true, message: '手机号不能为空', trigger: 'blur'},
    {type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur'}
  ],
  code: [
    // {required: true, message: '请填写6位验证码', trigger: 'blur'},
    // {type: 'string', min: 6, max: 6, message: '验证码错误', trigger: 'blur'}
  ]
})

</script>
<style lang="less" scoped>
.info-form {
  width: 90% !important;
}
</style>
