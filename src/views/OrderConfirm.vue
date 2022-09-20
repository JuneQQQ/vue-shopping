<template>
  <SearchBar></SearchBar>

  <div class="goods-list-container">
    <el-alert type="success" center show-icon style="margin-bottom: 15px">
      <template #title>
        您的订单编号为 {{ orderStore.orderInfo.orderNo }} ,请确认订单信息
        <!--        <el-progress :percentage="timerRemainPercentage"  color="#FF7F50" />-->
      </template>
    </el-alert>

    <!--商品信息栏-->
    <el-alert title="商品信息" type="error" effect="dark" class="goods-list-container-title" :closable="false"></el-alert>
    <el-card class="goods-list-container-card">
      <el-table
          ref="multipleTableRef"
          :data="orderStore.orderInfo.goodsList"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
      >
        <el-table-column label="商品" width="400">
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
        <el-table-column label="数量">
          <template #default="scope">
            <el-tag type="danger">{{ scope.row.count }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="小计">
          <template #default="scope">
            <el-tag type="danger" effect="dark">
              ￥{{ (scope.row.singlePrice * scope.row.count).toFixed(2) }}
            </el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="operation" label="操作">-->
        <!--          <template #default="scope">-->
        <!--            <el-button-->
        <!--                size="small"-->
        <!--                type="info"-->
        <!--                text-->
        <!--                @click="handleDelete(scope.row.skuId)"-->
        <!--            >-->
        <!--              <el-icon>-->
        <!--                <Delete/>-->
        <!--              </el-icon>-->
        <!--              删除商品-->
        <!--            </el-button>-->
        <!--            &lt;!&ndash;          <el-row>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <el-button&ndash;&gt;-->
        <!--            &lt;!&ndash;                size="small"&ndash;&gt;-->
        <!--            &lt;!&ndash;                type="info"&ndash;&gt;-->
        <!--            &lt;!&ndash;                text&ndash;&gt;-->
        <!--            &lt;!&ndash;                @click="handleDelete(scope.$index, scope.row)"&ndash;&gt;-->
        <!--            &lt;!&ndash;            >修改商品&ndash;&gt;-->
        <!--            &lt;!&ndash;            </el-button&ndash;&gt;-->
        <!--            &lt;!&ndash;            >&ndash;&gt;-->
        <!--            &lt;!&ndash;          </el-row>&ndash;&gt;-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </el-card>

    <!--收货信息栏-->
    <el-alert title="地址信息" type="success" effect="dark" class="goods-list-container-title" :closable="false"></el-alert>
    <el-card class="goods-list-container-card">
      <div class="address-container">
        <el-row>
          <el-radio-group v-model="orderStore.orderSubmitInfo.addressId">
            <el-radio :label="address.id"
                      size="large" border
                      v-for="(address, index) in orderStore.orderInfo.addressList"
                      :key="address.id"
                      style=" width: 100% !important;margin:10px"
            >
              {{
                address.addressee + "   " + address.province + "   " + address.city + "   " + address.community + "   " + address.phone + "   " + address.postalCode
              }}
            </el-radio>
          </el-radio-group>
        </el-row>
        <!--        <el-row>-->
        <!--          <el-link style="float:bottom">点击此处新建收货地址</el-link>-->
        <!--        </el-row>-->
      </div>
    </el-card>

    <!--备注信息栏-->
    <el-card class="goods-list-container-card">
      <div class="remarks-container">
        <h3>备注</h3>
        <el-input v-model="orderStore.orderSubmitInfo.remarks" size="large" placeholder="在这里填写备注信息"
                  class="remarks-input"></el-input>
      </div>
    </el-card>

    <!--发票-->
    <!--    <div class="invoices-container">-->
    <!--      <h3>发票信息</h3>-->
    <!--      <p>该商品不支持开发票</p>-->
    <!--    </div>-->

    <div class="pay-container">
      <div class="pay-box">
        <p>
          <span>提交订单应付总额：</span>
          <span class="money">
          <el-icon type="social-yen"></el-icon>
          {{ orderStore.getOrderConfirmTotalPrice.toFixed(2) }}
          </span>
        </p>
        <div class="pay-btn">
          <el-button color="red" size="large" round
                     @click="orderStore.pay"
          >支付订单
          </el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import SearchBar from "@/components/search/SearchBar.vue";
import {useOrderStore} from "@/stores/OrderStore";

const orderStore = useOrderStore()

orderStore.getOrderConfirmInfo()
// setInterval(() => {
//   timerRemainPercentage.value -=1
// }, 15*60/100*1000)   // 15分钟支付计时


</script>

<!--修改原生样式-->
<style lang="less">
.goods-list-container-card {
  .el-alert__content {
    width: 100%;
    text-align: center;

    i {
      display: none; // tag的closable属性有bug，这里直接设置不显示
    }
  }
}

</style>

<style scoped lang="less">

.goods-list-container-card {
  margin-bottom: 1%;
  margin-top: 1%;
  background-color: #ffffff;
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


