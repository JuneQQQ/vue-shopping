<template>
  <div class="goods-list-header">
    <el-card class="goods-list-header-card">
      <div class="card-header">
        <div style="font-size: 20px">
          <el-icon size="large">
            <ShoppingCartFull/>
          </el-icon>
          我的购物车
        </div>
      </div>
    </el-card>
  </div>
  <div class="goods-list-container">
    <el-alert title="提示" type="success" show-icon>
      请确认商品信息，请点击商品前的选择框，选择购物车中的商品，点击付款即可。
    </el-alert>
    <el-divider/>
    <el-table
        ref="multipleTableRef"
        :data="userStore.shoppingCartInfo"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="title" label="商品" width="400">
        <template #default="scope">
          <el-alert>
            <el-row>
              <el-col :span="8">
                <el-image
                    :fit="'scale-down'"
                    style="max-width:100px;height: 100%;width: 100%;"
                    src="http://dummyimage.com/350x350"></el-image>
              </el-col>
              <el-col :span="15" :offset="1">
                <div style="padding-top: 10%;padding-bottom: 10%;">{{ scope.row.title }}</div>
              </el-col>
            </el-row>
          </el-alert>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <template #default="scope">
          <el-tag>￥{{ scope.row.singlePrice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量">
        <template #default="scope">
          <el-input-number v-model="scope.row.count" :min="1" :max="999"/>
        </template>
      </el-table-column>
      <el-table-column label="小计">
        <template #default="scope">
          <el-tag type="danger" effect="dark">
            ￥{{ (scope.row.singlePrice * scope.row.count).toFixed(2) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <el-button
              size="small"
              type="info"
              text
              @click="handleDelete(scope.row.skuId)"
          >
            <el-icon>
              <Delete/>
            </el-icon>
            删除商品
          </el-button>
          <!--          <el-row>-->
          <!--            <el-button-->
          <!--                size="small"-->
          <!--                type="info"-->
          <!--                text-->
          <!--                @click="handleDelete(scope.$index, scope.row)"-->
          <!--            >修改商品-->
          <!--            </el-button-->
          <!--            >-->
          <!--          </el-row>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pay-container">
      <div class="pay-box">
        <el-icon>
          <Money/>
        </el-icon>
        合计：<span class="pay-box-price">{{ userStore.getShoppingCartTotalPrice.toFixed(2) }}</span>
        <el-button type="danger" size="large" @click="orderStore.pay">下单</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "@/stores/UserStore";
import {ElMessageBox, ElTable, ElMessage} from "element-plus";
import {useOrderStore} from "@/stores/OrderStore";
import {onMounted, ref, toRaw} from "vue"
import type {ShoppingCart} from "@/assets/model/ShoppingCartDataModel";

let userStore = useUserStore();
let orderStore = useOrderStore();

userStore.getShoppingCartInfo()

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const getCurrentSelected = () => {
  return multipleTableRef.value.getSelectionRows()
}

// select default
onMounted(() => {
  console.log("begin switch")
  multipleTableRef.value?.clearSelection()
  userStore.shoppingCartInfo.forEach(item => {
    if (item.isSelected) {
      multipleTableRef.value?.toggleRowSelection(item, true)
    }
  })
})

const handleDelete = (skuId: number) => {
  ElMessageBox.confirm(
      '确认删除吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    userStore.currentSelectedSkuIdSet.delete(skuId)  // currentSelectedSkuIdSet 删除
    for (let i = 0; i < userStore.shoppingCartInfo.length; i++) {
      if (userStore.shoppingCartInfo[i].skuId == skuId) {
        console.log("准备删除", userStore.shoppingCartInfo)
        userStore.shoppingCartInfo.splice(i, 1)
      }
    }
    ElMessage.success("删除成功")
  }).catch(() => {
    // 取消
  })
}
const multipleSelection = ref<ShoppingCart.ShoppingCartInfo>([])
const handleSelectionChange = (selected: Array<any>) => {
  console.log("change")
  multipleSelection.value = selected


  const set = new Set()
  selected.forEach(selectedItem => {
    set.add(selectedItem.skuId)
  })

  userStore.shoppingCartInfo.forEach(item=>{
    item.isSelected = set.has(item.skuId);
  })

}

</script>
<style lang="less">
.el-alert__content {
  width: 100%;
  text-align: center;

  i {
    display: none; // tag的closable属性有bug，这里直接设置不显示
  }
}
</style>
<style scoped lang="less">
.goods-list-header {
  margin: 15px auto;
  width: 80%;

  .goods-list-header-card {
    margin-top: 3%;
    background-color: whitesmoke;
  }
}

.goods-list-container {
  margin: 15px auto;
  width: 80%;
}

.tips-box {
  margin-bottom: 15px;
}

.address-container {
  margin-top: 15px;
}

.address-card {
  margin-top: 15px;
  padding: 15px;
  border: 1px #ccc dotted;
}

.address-check {
  margin: 15px 0px;
  height: 36px;
  display: flex;
  align-items: center;
}

.address-check-name {
  width: 120px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #ccc;
}

.address-check-name span {
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background-color: #f90013;
}

.address-detail {
  padding-left: 15px;
  font-size: 14px;
  color: #999999;
}

.remarks-container {
  margin: 15px 0px;
}

.remarks-input {
  margin-top: 15px;
}

.invoices-container p {
  font-size: 12px;
  line-height: 30px;
  color: #999;
}

.pay-container {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}

.pay-box {
  font-size: 18px;
  font-weight: bolder;
  color: #495060;
  margin: 20px;

  .pay-box-price {
    margin-right: 30px;
    color: red;
    font-size: 25px;
    text-align: center;
    vertical-align: sub;
  }
}

.money {
  font-size: 26px;
  color: #f90013;
}

.pay-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
