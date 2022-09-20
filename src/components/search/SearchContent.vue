<template>
  <!-- 右侧窗口侧边栏 -->
  <el-backtop :right="100" :bottom="100"/>
  <!--bread-->
  <div class="bread" v-show="searchStore.filterConditions.attrs.length>0||searchStore.searchParam.keyword">
    <ul class="fl sui-breadcrumb">
      <li>
        <a href="#">全部结果</a>
      </li>
    </ul>
    <ul class="fl sui-tag">
      <li class="with-x" v-if="searchStore.searchParam.keyword">"{{ searchStore.searchParam.keyword }}"</li>
      <li class="with-x" v-for="(attr,index) in searchStore.filterConditions.attrs" :key="attr.attrValueId">
        {{ attr.attrName + ':' + attr.attrValue }}
        <i @click="searchStore.addOrRemoveFilterAttr(attr.attrId, attr.attrValueId, attr.attrValue,attr.attrName,  false)">×</i>
      </li>
    </ul>
  </div>
  <!--过滤条件栏-->
  <div class="inner-container">
    <div class="item-class-show-nav">
      <!--当filterConditions过滤条件中没有这一行时可以显示，如果有表示这一行已经被选择当做过滤条件-->
      <el-row class="item-class-group-nav" :key="index"
              v-show="searchStore.filterConditions.attrs.filter(item =>{return item.attrId===items.attrId}).length===0"
              v-for="(items, index) in searchStore.searchResult.attrs"
      >
        <el-col class="item-class-name-nav" :span="3">{{ items.attrName }} :</el-col>
        <el-col class="item-class-select-nav" :span="21">
            <span v-for="(a, subIndex) in items.attrValueList" :key="subIndex"
                  @click="searchStore.addOrRemoveFilterAttr
                  (items.attrId,a.attrValueId,a.attrValue,items.attrName,true)"
            >{{ a.attrValue }}</span>
        </el-col>
      </el-row>
    </div>
    <!-- 商品展示容器 -->
    <div class="goods-box">
      <div class="as-box">
        <div class="item-as-title">
          <span style="font-size: 20px">商品精选</span>
          <span>广告</span>
        </div>
        <div class="item-as"
             v-for="(item,index) in searchStore.$state.searchResult.selectedGoods" :key="index">
          <div class="item-as-img">
            <img :src="item.img" alt="">
          </div>
          <div class="item-as-price">
              <span>
                <span class="seckill-price text-danger">￥{{ goodsItemStore.getTotalPrice }}</span>
              </span>
          </div>
          <div class="item-as-title">
            <span>{{ item.title }}</span>
          </div>
          <div class="item-as-selled">
            已有<span>{{ item.remarks }}</span>人评价
          </div>
        </div>
      </div>
      <div class="goods-list-box">
        <div class="goods-list-tool">
          <ul>
            <li v-for="(item,index) in goodsTool" :key="index" @click="searchStore.changeSortCondition(item.en)">
                <span
                    :class="{ 'goods-list-tool-active': item.en===searchStore.filterConditions.sort.field}">
                  {{ item.title }}
                  <el-icon v-show="searchStore.filterConditions.sort.field===item.en">
                    <CaretTop v-if="searchStore.filterConditions.sort.asc"/>
                    <CaretBottom v-else/>
                  </el-icon>
                </span>
            </li>
          </ul>
        </div>
        <!--商品项-->
        <div class="goods-list">
          <!--
               TODO
               如果商品属性中的某一条存在于过滤对象searchStore.filterConditions中，那就不能显示
               这里由于接口均采用mock形式，数据不具关联性，所以以后再写
               如何用高效的办法找出两者是否有交集？我暂时没有想法
           -->
          <div class="goods-show-info"
               v-for="(item, index) in searchStore.searchResult.goods" :key="item.id"
               @click="goDetail(item.id)"
          >
            <div class="goods-show-box">
              <!--                <router-link to="/goodsDetail">-->
              <el-image :src="item.img" fit="fill" class="goods-show-img"></el-image>
              <!--                </router-link>-->
            </div>
            <div class="goods-show-price">
                <span>
                  <span class="seckill-price text-danger">￥{{ item.price }}</span>
                </span>
            </div>
            <div class="goods-show-detail">
              <span>{{ item.title }}</span>
            </div>
            <div class="goods-show-num">
              已有<span>{{ item.remarks }}</span>人评价
            </div>
            <div class="goods-show-seller">
              <span>{{ item.shopName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-page">
      <el-pagination background layout="prev, pager, next"
                     :default-current-page="searchStore.searchResult.pageNo"
                     :page-size="16"
                     :total="searchStore.searchResult.total"
                     @current-change="handleCurrentChange"
      />
      <!--        "total": number,-->
      <!--        "pageSize": number,-->
      <!--        "pageNo": number,-->
      <!--        "totalPages": number,-->
    </div>
  </div>


</template>
<script setup lang="ts">

import {useSearchStore} from "@/stores/SearchStore";
import router from "@/router/MainRouter";
import {useGoodsItemStore} from "@/stores/GoodsDetailStore"
import {onBeforeMount, onMounted} from "vue";

let searchStore = useSearchStore();
let goodsItemStore = useGoodsItemStore()

let handleCurrentChange = (val: number) => {
  searchStore.$patch(state => {
    state.searchParam.pageNo = val
  })
  // 发送请求
  searchStore.getSearchResult()
  // document.documentElement.scrollTop = 0;
}

onBeforeMount(()=>{
  // 来到页面时手动调用一次
  searchStore.getSearchResult()
})


let goodsTool = [
  {title: '综合', en: 'hotScore'},
  {title: '销量', en: 'sales'},
  {title: '价格', en: 'price'},
  {title: '评论数', en: 'remarks'},
]

let goDetail = (id: number) => {
  console.log("goDetail!",id)
  goodsItemStore.curSelectedSkuId = id
  goodsItemStore.getItem(id)

  router.push({name: 'Detail'})
}
</script>
<style lang="less" scoped>
/* 面包屑导航开始 */
.bread {
  margin-left: 3%;
  margin-bottom: -2%;
  margin-top: 1%;
  overflow: hidden;

  .sui-breadcrumb {
    padding: 3px 15px;
    margin: 0;
    font-weight: 400;
    border-radius: 3px;
    float: left;

    li {
      display: inline-block;
      line-height: 18px;

      a {
        color: #666;
        text-decoration: none;

        &:hover {
          color: #4cb9fc;
        }
      }
    }
  }

  .sui-tag {
    margin-top: -5px;
    list-style: none;
    font-size: 0;
    line-height: 0;
    padding: 5px 0 0;
    margin-bottom: 18px;
    float: left;

    .with-x {
      font-size: 12px;
      margin: 0 5px 5px 0;
      display: inline-block;
      overflow: hidden;
      color: #000;
      background: #f7f7f7;
      padding: 0 7px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #dedede;
      white-space: nowrap;
      transition: color 400ms;
      cursor: pointer;

      i {
        margin-left: 10px;
        cursor: pointer;
        font: 400 14px tahoma;
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }

      &:hover {
        color: #28a3ef;
      }
    }
  }
}

/* 面包屑导航结束 */
///
.inner-container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}

.text-danger {
  color: #A94442;
}

.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}

.goods-box {
  display: flex;
}

/* ---------------导航栏开始------------------- */
.item-class-show-nav {
  margin: 15px auto;
  width: 100%;
}

.item-class-group-nav {
  margin-top: 1px;
  height: 45px;
  border-bottom: 1px solid #ccc;
}

.item-class-group-nav:first-child {
  border-top: 1px solid #ccc;
}

.item-class-name-nav {
  padding-left: 15px;
  line-height: 44px;
  color: #666;
  font-weight: bold;
  background-color: #f3f3f3;
}

.item-class-name-nav:first-child {
  line-height: 43px;
}

.item-class-select-nav span {
  margin-left: 15px;
  width: 160px;
  color: #005aa0;
  line-height: 45px;
  cursor: pointer;
}

/* ---------------导航栏结束------------------- */
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}

.item-as-title {
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}

.item-as-title span:first-child {
  margin-left: 20px;
}

.item-as-title span:last-child {
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}

.item-as {
  width: 160px;
  margin: 18px auto;
}

.item-as-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
}

.item-as-price span {
  font-size: 18px;
}

.item-as-title {
  margin-top: 5px;
  font-size: 12px;
}

.item-as-selled {
  margin-top: 5px;
  font-size: 12px;
}

.item-as-selled span {
  color: #005AA0;
}

/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-show-box {
  .goods-show-img {
    width: 100%;
    height: 250px;
  }
}

.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px);
}

.goods-list-tool {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}

.goods-list-tool ul {
  padding-left: 15px;
  list-style: none;
}

.goods-list-tool li {
  cursor: pointer;
  float: left;
}

.goods-list-tool span {
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}

.goods-list-tool span:hover {
  border: 1px solid #E4393C;
}

.goods-list-tool i:hover {
  color: #E4393C;
}

.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 50px;
  //justify-content: space-between;
}

.goods-show-info {
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer;
}

.goods-show-info:hover {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}

.goods-show-price {
  margin-top: 6px;
}

.goods-show-detail {
  font-size: 12px;
  margin: 6px 0px;
}

.goods-show-num {
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}

.goods-show-num span {
  color: #005AA0;
  font-weight: bold;
}

.goods-show-seller {
  font-size: 12px;
  color: #E4393C;
}

.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

/* ---------------商品栏结束------------------- */
</style>
