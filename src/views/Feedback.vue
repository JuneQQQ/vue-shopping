<template>
  <div class="feedback-container">
    <div class="feedback-img-box">
      <img src="/images/feedback.png">
    </div>
    <div class="feedback-box-border">
      <div class="feedback-box">
        <div class="feedback-title">
          <h1>意见反馈~</h1>
          <h2>感谢你的反馈，我们会积极改善，做出更好的服务的！</h2>
        </div>
        <el-card class="feedback-content">
          <div class="feedback-form">
            <el-form ref="ruleFormRef" :model="formData" :label-width="80" :rules="rules">
              <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="反馈信息" prop="content">
                <el-input v-model="formData.content" type="textarea" resize="none" :autosize="{minRows: 8,maxRows: 12}"
                          placeholder="请输入反馈信息"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%;">
                  提交
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance,FormRules} from 'element-plus'
import {ElMessage} from "element-plus";
import router from "@/router/MainRouter";

const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  title: '',
  content: ''
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessage.success("感谢您的反馈，我们因此为您的反馈会做的更好！")
      router.push({name:'Index'})
    } else {
      return false
    }
  })
}


const rules = reactive<FormRules>({   // 登录方式一
  title: [
    {required: true, message: '请输入标题', trigger: 'blur'},
  ],
  content: [
    {required: true, message: '请输入反馈内容', trigger: 'blur'},
  ],
})

</script>
<style scoped lang="less">
.feedback-container {
  margin: 15px auto;
  width: 80%;
  height: 600px;
  display: flex;
  align-items: center;
  /* background-color: #ccc; */
}

.feedback-img-box {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-img-box img {
  width: 80%;
}

.feedback-box-border {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-box {
  width: 480px;
}

.feedback-content {
  margin: 15px auto;
}

.feedback-form {
  margin: 30px auto;
  width: 90%;
}
</style>
