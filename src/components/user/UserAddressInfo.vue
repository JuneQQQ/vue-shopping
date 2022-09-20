<template>
  <div v-show="userStore.userAddressList.length">
    <el-card class="address-card" v-for="(item, index) in userStore.userAddressList" :key="index"
    >
      <div class="address-header">
        <span>{{ item.addressee }}</span>
        <div class="address-action">
          <span @click="editAddress"><el-icon><Edit/></el-icon> 修改</span>
          <span @click="del(item.addressId)"><el-icon><Delete/></el-icon> 删除</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title"> 收 货 人 :</span> {{ item.addressee }}</p>
        <p><span class="address-content-title">收货地区:</span> {{ item.province }} {{ item.city }} {{ item.area }}</p>
        <p><span class="address-content-title">收货地址:</span> {{ item.community }}</p>
        <p><span class="address-content-title">邮政编码:</span> {{ item.postalCode }}</p>
      </div>
    </el-card>
    <el-button type="info" effect="dark" text
               style="margin-top: 10px;float:right"
               @click="addAddress"
    >
      添加新地址
    </el-button>
  </div>

  <el-empty description="暂时还没有收货地址" v-show="!userStore.userAddressList.length">
    <el-button type="danger" @click="addAddress">添加第一个收货地址吧</el-button>
  </el-empty>

  <el-dialog v-model="dialogShow" :title="isEdit?'修改地址':'添加地址'" width="50%">
    <el-form :model="userStore.addressInfo" :rules="rules" ref="ruleFormRef"
             label-suffix=":" label-width="100px">
      <el-form-item label="收件人" prop="addressee">
        <el-input v-model="userStore.addressInfo.addressee" clearable size="large"></el-input>
      </el-form-item>
      <el-form-item label="收件地区" prop="regionNumber">
        <el-cascader
            placeholder="请选择地区"
            size="large"
            :options="userStore.regionData"
            v-model="userStore.addressInfo.regionNumber"
            @change="handleRegionChange"
            style="width: 250px"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="街道地址" prop="community">
        <el-input v-model="userStore.addressInfo.community" size="large"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="userStore.addressInfo.phone" size="large"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="postalCode">
        <el-input v-model="userStore.addressInfo.postalCode" size="large"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>
<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import type {FormInstance, FormRules} from 'element-plus'
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {ref} from 'vue'
const userStore = useUserStore()
userStore.getUserAddressList()

const dialogShow = ref(false)   // 编辑窗口
const isEdit = ref(false)   // 编辑窗口

const editAddress = (addressId: number) => {
  isEdit.value = true;
  userStore.showAddressInfo(addressId)
  dialogShow.value = true;
}
const addAddress = () => {
  dialogShow.value = true;
  isEdit.value = false;
  userStore.addressInfo = {}
}

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) console.log("error：未传入formEl")
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!userStore.changeAddressInfo()) ElMessage.error((isEdit ? '修改' : '添加') + '失败，请稍后再试')
      else ElMessage.success((isEdit ? "修改" : "添加") + "成功")
    } else {
      ElMessage.error("请输入正确的地址信息")
    }
  })
  dialogShow.value = false
}

const resetForm = (formEl: FormInstance | undefined) => {
  dialogShow.value = false
  if (!formEl) return
  // formEl.resetFields() // 不生效
  userStore.addressInfo = {}
}


const handleRegionChange = (value) => {
}


const del = (addressId: number) => {
  ElMessageBox.confirm(
      '确认删除吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    userStore.deleteAddress(addressId)
    ElMessage.success("删除成功")
  }).catch(() => {
    // 取消
  })
}


const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  addressee: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
  ],
  regionNum: [
    {required: true, message: '请输入地址', trigger: 'blur'}
  ],
  postalCode: [
    {required: true, message: '请输入邮政编码', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '手机号不能为空', trigger: 'blur'},
    {type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur'}
  ],
  community: [
    {required: true, message: '请输入街道/社区信息', trigger: 'blur'}
  ]
})


</script>
<style lang="less" scoped>


.address-card {
  width: 100%;
  height: auto;
  margin-right: 10px;
}

.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}

.address-content {
  font-size: 14px;
}

.address-content-title {
  color: #999;
}

.address-action span {
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
