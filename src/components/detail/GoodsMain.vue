<template>
  <!--商品属性展示栏-->
  <div class="item-detail-show">
    <div class="item-detail-left">
      <div class="item-detail-big-img">
        <el-image
            style="width: 100%; height: 100%"
            :src="goodsItemStore.goodsInfo.goodsImg[imgIndex]" alt=""/>
      </div>
      <div class="item-detail-img-row">
        <div class="item-detail-img-small"
             v-for="(item, index) in goodsItemStore.goodsInfo.goodsImg" :key="index"
             @mouseover="changeBIgImg(index)">
          <el-image :src="item" style="width: 100%; height: 100%" alt="点击"/>
        </div>
      </div>
    </div>
    <div class="item-detail-right">
      <div class="item-detail-title">
        <p>
          <span class="item-detail-express">校园配送</span> {{ goodsItemStore.goodsInfo.title }}</p>
      </div>
      <div class="item-detail-tag">
        <p>
          <span v-for="(item,index) in goodsItemStore.goodsInfo.tags" :key="index">【{{ item }}】</span>
        </p>
      </div>
      <div class="item-detail-price-row">
        <div class="item-price-left">
          <div class="item-price-row">
            <p>
              <span class="item-price-title">B I T 价</span>
              <span class="item-price">￥{{ goodsItemStore.getTotalPrice.toFixed(2) }}</span>
            </p>
          </div>
          <div class="item-price-row">
            <p>
              <span class="item-price-title">优&nbsp&nbsp&nbsp&nbsp&nbsp惠</span>
              <span class="item-price-full-cut" v-for="(item,index) in goodsItemStore.goodsInfo.discount"
                    :key="index">{{ item }}</span>
            </p>
          </div>
          <div class="item-price-row">
            <p>
              <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
              <span class="item-price-full-cut" v-for="(item,index) in goodsItemStore.goodsInfo.promotion"
                    :key="index">{{ item }}</span>
            </p>
          </div>
        </div>
        <div class="item-price-right">
          <div class="item-remarks-sum">
            <p>累计评价</p>
            <p>
              <span class="item-remarks-num">{{ goodsItemStore.goodsInfo.remarksNum }} 条</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 选择属性 -->
      <div class="item-select">
        <div class="item-select-title">
          <p>选择颜色</p>
        </div>
        <div class="item-select-column">
          <el-row>
            <el-col class="item-select-box"
                    :span="6"
                    v-for="(item, index) in goodsItemStore.goodsInfo.skus" :key="item.id"
                    :class="{'item-select-box-active': (item.id === goodsItemStore.curSelectedSkuId)}"
                    @click="goodsItemStore.changeSelect(item.id)"
            >
              <div class="item-select-img">
                <img :src="item.img" alt="">
              </div>
              <div class="item-select-intro">
                <p>{{ item.intro }}</p>
              </div>
            </el-col>

          </el-row>
        </div>
      </div>
      <!-- 白条分期 -->
      <div class="item-select">
        <div class="item-select-title">
          <p>白条分期</p>
        </div>
        <div class="item-select-row">
          <div class="item-select-class" v-for="(item,index) in goodsItemStore.getPayment" :key="index">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="item.tooltip"
                placement="top"
            >
              <span>{{ item.type }}</span>
            </el-tooltip>
          </div>
        </div>
      </div>
      <br>
      <el-row :gutter="20">
        <el-col :span="6" :offset="1">
          <el-input-number :min="1" v-model="goodsItemStore.curSelectedCount" size="large"></el-input-number>
        </el-col>
        <el-col :span="10">
          <el-button type="danger" size="large" @click="goOrderConfirm">立即购买</el-button>
          <el-button type="danger" size="large" @click="goCard">加入购物车</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useGoodsItemStore} from "@/stores/GoodsDetailStore";
import {useOrderStore} from "@/stores/OrderStore";
import {ref} from 'vue'

import router from "@/router/MainRouter";
import {ElMessage} from "element-plus";
let imgIndex = ref(0)

let goodsItemStore = useGoodsItemStore();
let orderStore = useOrderStore();

let goOrderConfirm = () => {
  // 这里直接把页面数据带到订单确认页
  // 订单提交时校验下数据
  router.push({name: 'OrderConfirm'});
}

let goCard = () => {
  if(goodsItemStore.addToCart()){  // 发请求 返回boolean
    router.push({name: 'SuccessAddToShoppingCart'}); // 页面跳转
  }else{
    ElMessage.error("加入购物车失败")
  }
}

let changeBIgImg = (index) => {
  imgIndex.value = index;
}

</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}

.item-detail-left {
  width: 350px;
  margin-right: 30px;
}

.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}

.item-detail-big-img img {
  width: 100%;
}

.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}

.item-detail-img-small img {
  width: 100%;
}

/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}

.item-detail-title p {
  color: #666;
  font-size: 20px;
}

.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}

/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}

/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}

.item-price-left {
  display: flex;
  flex-direction: column;
}

.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}

.item-price-row {
  margin: 5px 0px;
}

.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}

.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}

.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc;
}

.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}

.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}

.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}

.item-select-column {
  display: flex;
  flex-direction: column;
}

.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}

.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item-select-img {
  width: 36px;
}

.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}

.item-select-box:hover {
  border: 0.5px solid #e3393c;
}

.item-select-box-active {
  border: 0.5px solid #e3393c;
}

.item-select-img img {
  width: 100%;
}

.item-select-intro p {
  margin: 0px;
  padding: 5px;
}

.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}

.item-select-class:hover {
  border: 0.5px solid #e3393c;
}

.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}

.add-buy-car {
  margin-top: 15px;
}

/******************商品图片及购买详情结束******************/
</style>

