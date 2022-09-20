<template>
  <!--商品介绍展示栏-->
  <div class="item-intro-show">
    <div class="item-intro-recommend">
      <div class="item-recommend-title">
        <p>店铺热销</p>
      </div>
      <div class="item-intro-recommend-column">
        <div class="item-recommend-column" v-for="(item, index) in goodsItemStore.goodsInfo.hot" :key="index">
          <div class="item-recommend-img">
            <img :src="item.img" alt="">
          </div>
          <div class="item-recommend-intro">
              <span>
                <span class="item-recommend-top-num">{{ index + 1 }}</span> 热销{{ item.sale }}件</span>
            <span class="item-recommend-price">￥{{ item.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item-intro-detail" ref="itemIntroDetail">
      <div class="item-intro-nav item-tabs">
        <el-tabs type="border-card" class="item-intro-tabs">
          <el-tab-pane label="商品介绍">
            <!--            <div class="remarks-title">-->
            <!--              <span>商品介绍</span>-->
            <!--            </div>-->
            <div class="item-intro-img">
              <img :src="item" alt="" v-for="(item,index) in goodsItemStore.goodsInfo.goodsDetail" :key="index">
            </div>
          </el-tab-pane>
          <el-tab-pane label="规格参数">
            <div class="item-param-container">
                <span class="item-param-box" v-for="(item,index) in goodsItemStore.goodsInfo.param" :key="index">
                  <span class="item-param-title">{{ item.title }}: </span>
                  <span class="item-param-content">{{ item.content }}</span>
                </span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="售后保障">
            <div class="remarks-title">
              <span>售后保障</span>
            </div>
            <div class="item-protect-container">
              <div class="item-protect-box">
                <p class="item-protect-title-box">
                  <el-avatar :size="35" style="background-color: #e4393c;">
                    <el-icon size="large">
                      <Van/>
                    </el-icon>
                  </el-avatar>
                  <span class="item-protect-title">卖家服务</span>
                </p>
                <p class="item-protect-detail">
                  高品质敢承诺：7天无理由退货，30天免费换新，质量问题商家承担来回运费换新；如需发票，请在确认收货无误后联系商家开出。（注*发票不随货品一同发出）
                </p>
              </div>
              <div class="item-protect-box">
                <p class="item-protect-title-box">
                  <el-avatar :size="35" style="background-color: #e4393c;">
                    <el-icon size="large">
                      <List/>
                    </el-icon>
                  </el-avatar>
                  <span class="item-protect-title">平台承诺</span>
                </p>
                <p class="item-protect-detail">
                  平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！<br>
                  注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                </p>
              </div>
              <div class="item-protect-box">
                <p class="item-protect-title-box">
                  <el-avatar :size="35" style="background-color: #e4393c;">
                    <el-icon size="large">
                      <Medal/>
                    </el-icon>
                  </el-avatar>
                  <span class="item-protect-title">正品行货</span>
                </p>
                <p class="item-protect-detail">
                  BIT商城向您保证所售商品均为正品行货，BIT自营商品开具机打发票或电子发票。
                </p>
              </div>
              <div class="item-protect-box">
                <p class="item-protect-title-box">
                  <el-avatar :size="35" style="background-color: #e4393c;">
                    <el-icon size="large">
                      <SuitcaseLine/>
                    </el-icon>
                  </el-avatar>
                  <span class="item-protect-title">全国联保</span>
                </p>
                <p class="item-protect-detail">
                  凭质保证书及BIT商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由BIT联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。BIT商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！<br><br>
                  注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品评价">
            <div class="remarks-container">
              <div class="remarks-title">
                <span>商品评价</span>
              </div>
              <div class="remarks-analyse-box">
                <div class="remarks-analyse-goods">
                  <el-progress type="circle" :percentage="goodsItemStore.goodsInfo.remarks.goodAnalyse"
                               status="success">
                    <span class="remarks-analyse-num">{{ goodsItemStore.goodsInfo.remarks.goodAnalyse }}%</span>
                    <p class="remarks-analyse-title">好评率</p>
                  </el-progress>
                </div>
                <div class="remarks-analyse-tags">
                  <el-tag checkable :type="['danger', '', 'warning', 'success'][index%4]"
                          v-for="(item,index) in goodsItemStore.goodsInfo.remarks.remarksTags" :key="index">
                    {{ item }}
                  </el-tag>
                </div>
              </div>
              <div class="remarks-bar">
                <span>追评({{ goodsItemStore.goodsInfo.remarks.remarksNumDetail[0] }})</span>
                <span>好评({{ goodsItemStore.goodsInfo.remarks.remarksNumDetail[1] }})</span>
                <span>中评({{ goodsItemStore.goodsInfo.remarks.remarksNumDetail[2] }})</span>
                <span>差评({{ goodsItemStore.goodsInfo.remarks.remarksNumDetail[3] }})</span>
              </div>
              <div class="remarks-box" v-for="(item,index) in goodsItemStore.goodsInfo.remarks.detail" :key="index">
                <el-row>
                  <el-col :span="3">
                    <div style="margin: 20% 30%">
                      <el-avatar
                          style="margin-left: 5%"
                          :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                      >
                        <!--图片加载失败时显示↓-->
                        <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
                      </el-avatar>
                      <span style="display:flex;">{{ item.username }}</span>
                    </div>
                  </el-col>
                  <el-col :span="21">
                    <p>
                      <el-rate disabled :value="item.values" allow-half class="remarks-star"></el-rate>
                    </p>
                    <p class="remarks-content">{{ item.content }}</p>
                    <p class="remarks-sub">
                      <span class="remarks-item">{{ item.goods }}</span>
                      <span class="remarks-time">{{ item.time }}</span>
                    </p>
                  </el-col>
                  <el-divider style="margin: 1%"/>
                </el-row>
              </div>
              <!--              <div class="remarks-page">-->
              <!--                <Page :total="40" size="small" show-elevator show-sizer></Page>-->
              <!--              </div>-->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useGoodsItemStore} from "@/stores/GoodsDetailStore";

let goodsItemStore = useGoodsItemStore();
</script>

<style scoped>
/***************售后保障栏开始***************/
.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}

.item-protect-container {
  padding: 15px;
}

.item-protect-box {
  margin-bottom: 30px;
}

.item-protect-title-box {
  display: flex;
  align-items: center;
}

.item-protect-title {
  padding-left: 15px;
  font-size: 20px;
  font-weight: bolder;
  color: #e4393c;
}

.item-protect-detail {
  padding-top: 5px;
  padding-left: 46px;
  font-size: 14px;
  color: #999;
}

/***************售后保障栏结束***************/


/***************商品详情介绍和推荐侧边栏开始***************/
.item-intro-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}

.item-intro-recommend {
  width: 200px;
  display: flex;
  flex-direction: column;
}

.item-intro-recommend-column {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #999;
}

.item-recommend-title {
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #fff;
  background-color: #E4393C;
  box-shadow: 0px 0px 5px #E4393C;
  text-align: center;
}

.item-recommend-column {
  margin-top: 15px;
}

.item-recommend-intro {
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.item-recommend-img {
  width: 80%;
  margin: 0px auto;
  cursor: pointer;
}

.item-recommend-img img {
  width: 100%;
}

.item-recommend-top-num {
  color: #fff;
  margin: 0px 2px;
  padding: 1px 5px;
  border-radius: 12px;
  background-color: #E4393C;
}

.item-recommend-price {
  color: #E4393C;
  font-weight: bolder;
}

.item-intro-detail {
  margin-left: 30px;
  width: calc(80vw - 300px);
}

.el-tabs__header {
  background-color: red;
  border-bottom: 1px solid #E4393C;
}

.item-intro-nav ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

.item-intro-nav li {
  float: left;
  height: 100%;
  width: 120px;
  line-height: 38px;
  text-align: center;
  color: #E4393C;
}

.item-intro-nav li:first-child {
  background-color: #E4393C;
  color: #fff;
}

.item-intro-img {
  width: 100%;
}

.item-intro-img img {
  width: 100%;
}

/************* 商品参数 *************/
.item-param-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}

.item-param-box {
  padding: 5px;
  padding-left: 30px;
  width: 240px;
  height: 36px;
  font-size: 14px;
  /* text-align: center; */
  /* background-color: #ccc; */
}

.item-param-title {
  color: #232323;
}

.item-param-content {
  color: #999;
}

.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}

.remarks-analyse-box {
  padding: 15px;
  display: flex;
  align-items: center;
}

.remarks-analyse-goods {
  margin-left: 15px;
  margin-right: 15px;
}

.remarks-analyse-num {
  font-size: 26px;
}

.remarks-analyse-title {
  font-size: 12px;
  line-height: 20px;
}

.remarks-bar {
  padding-left: 15px;
  margin-bottom: 1%;
  height: 36px;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}

.remarks-bar span {
  margin-right: 15px;
}

.remarks-box {
  /*padding: 15px;*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*border-bottom: 1px #ccc dotted;*/
}

.remarks-user {
  width: 180px;
}

.remarks-user-name {
  padding-left: 15px;
}

.remarks-content-box {
  width: calc(100% - 180px);
}

.remarks-star {
  background-color: #fff;
}

.remarks-content {
  font-size: 14px;
  color: #232323;
  line-height: 28px;
}

.remarks-sub {
  color: #ccc;
}

.remarks-time {
  margin-left: 15px;
}

.remarks-page {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}

/***************商品详情介绍和推荐侧边栏结束***************/
</style>

<!--改变便签页样式-->
<style lang="less">
.el-tabs__nav-scroll {
  background-color: #F7F7F7;
}

.el-tabs__item:not(.is-active):hover {
  color: red !important;
}

.el-tabs__item.is-active {
  color: #fff !important;
  background-color: red !important;
}
.el-tabs__content{
  //padding-top: 10px;
  padding: 0 !important;
}


</style>
