<template>
  <el-row class="inner-container">
    <el-col :span="13" :offset="2" class="login-img-box">
      <el-image src="images/2048x1080.png" alt=""/>
    </el-col>


    <el-col :span="9" class="login-box">
      <el-card style="width: 60%;height: 65%;">
        <el-alert center :closable="false" style="background-color: white;color: black;">
          <template #title>
            <h1 style="font-size: 20px;color: dimgrey">账号登录</h1>
          </template>
        </el-alert>


        <div style="font-size: 15px;text-align: center;margin: 20px">
          <el-link :underline="false" @click="userStore.loginByPassword=true" :style="{color:userStore.loginByPassword?'black':'gray'}">密码登录</el-link>
          |
          <el-link :underline="false" @click="userStore.loginByPassword=false" :style="{color:userStore.loginByPassword?'gray':'black'}">短信登录</el-link>
        </div>

        <!--账号登录-->
        <el-form ref="ruleFormRef1" :model="userStore.loginForm" :rules="rules1" v-show="userStore.loginByPassword">
          <el-form-item prop="username">
            <el-input type="text" v-model="userStore.loginForm.username" clearable size="large" placeholder="用户名">
              <template #prefix>
                <el-icon>
                  <User/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="userStore.loginForm.password" clearable size="large" placeholder="密码">
              <template #prefix>
                <el-icon>
                  <Lock/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="large" @click="handleSubmit(ruleFormRef1)" style="width: 100%">登录
            </el-button>
          </el-form-item>
        </el-form>


        <!--验证码登录-->
        <el-form ref="ruleFormRef2" :model="userStore.loginForm" :rules="rules2" v-show="!userStore.loginByPassword">
          <el-form-item prop="phone">
            <el-input type="text" v-model="userStore.loginForm.phone" clearable size="large" placeholder="手机号">
              <template #prefix>
                <el-icon>
                  <Cellphone/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="text" v-model="userStore.loginForm.code" clearable size="large" placeholder="验证码">
              <template #prefix>
                <el-icon>
                  <Lock/>
                </el-icon>
              </template>
              <template #append>
                <el-button type="success" @click="sendCode">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="large" @click="handleSubmit(ruleFormRef2)" style="width: 100%">登录
            </el-button>
          </el-form-item>
        </el-form>

        <el-link :underline="false" @click="router.push({name:'Register'})">没有账号？去注册</el-link>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import type {FormInstance, FormRules} from "element-plus";
import {useUserStore} from "@/stores/UserStore";
import {ElMessage} from "element-plus";
import router from "@/router/MainRouter";
import {ref} from 'vue'

const userStore = useUserStore()

const sendCode = () => {
  // userStore.sendCode()    // prod
  userStore.loginForm.code = Math.round(Math.random() * (100000)) + 99999  // dev
}

const ruleFormRef1 = ref<FormInstance>()   // 密码登录
const ruleFormRef2 = ref<FormInstance>()   // 验证码登录
const handleSubmit = async (formRules: FormInstance | undefined) => {
  if (!formRules) return

  await formRules.validate((valid, fields) => {
    if (valid) {
      if (userStore.login()) {
        // 如果登录信息有误在登录方法内会提示，这里只做正确的处理
        router.push({name: 'Index'})
      }
    } else {
      if (fields.username) ElMessage.error(fields.username[0].message)
      if (fields.password) ElMessage.error(fields.password[0].message)
      if (fields.phone) ElMessage.error(fields.phone[0].message)
      if (fields.code) ElMessage.error(fields.code[0].message)
      return false
    }
  })
}


const rules1 = reactive<FormRules>({   // 登录方式一
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {type: "string", min: 8, max: 16, message: "用户名长度在8~16位之间", trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {type: 'string', min: 6, max: 18, message: '密码长度在8~18位之间', trigger: 'blur'}
  ],
})
const rules2 = reactive<FormRules>({ // 登录方式二
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {type: 'string', min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur'}
  ],
  code: [
    // 开发环境下自动输入的验证码校验不通过？？？
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {type: 'string', min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur'}
  ]
})


</script>
<style lang="less" scoped>
.inner-container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}

.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-img-box > img {
  width: 68%;
}

.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 80%;
  height: 280px;
  border: #ED3F14 solid 1px;
}

.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: #fff;
  background-color: #ED3F14;
}

.form-box1 {
  width: 100%;
  margin: 30px auto;
}
</style>
