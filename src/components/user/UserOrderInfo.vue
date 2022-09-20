<template>
  <el-table :data="filterTableData" style="width: 100%" height="550">
    <el-table-column prop="orderNo" label="订单号" width="180" align="center"/>
    <el-table-column prop="imgUrl" label="图片" width="180" align="center">
      <template #default="scope">
        <el-image :src="scope.row.imgUrl" style="width: 100px;" :fit="'fill'" align="center"/>

      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" align="center"/>
    <el-table-column prop="count" label="购买数量" align="center"/>
    <el-table-column prop="totalPrice" label="总价" align="center"/>
    <el-table-column align="center">
      <template #header>
        <el-input v-model="searchKeyword" clearable placeholder="在此搜索"/>
      </template>
      <template #default="scope">
        <el-button type="warning" size="small" @click="handleDetail(scope.$index, scope.row)">订单详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import {reactive} from "vue";

const userStore = useUserStore()
userStore.getOrderList()

const searchKeyword = ref('')

const filterTableData = computed(() =>
    userStore.userOrderList.filter(
        (data) => {
          return !searchKeyword.value ||
              data.orderNo.includes(searchKeyword.value.toLowerCase()) ||
              data.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
              data.count === Number(searchKeyword.value) ||
              data.totalPrice === Number(searchKeyword.value)
        }
    )
)

</script>
<style lang="less" scoped>


.address-card {
  width: 100%;
  height: auto;
  margin-right: 10px;
}

</style>
