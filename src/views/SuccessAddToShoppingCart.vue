<template>
  <SearchBar></SearchBar>

  <!--加入购物车info-->
  <div class="add-info-box-container">
    <div class="add-info-box">
      <div class="add-info-detail">
        <div class="add-info-title">
          <p>
            <i class="fa fa-check-circle"></i> 商品已成功加入购物车！</p>
        </div>
        <div class="add-info-box-row">
          <div class="add-info-img">
            <img :src="info.package.img" alt="">
          </div>
          <div class="add-info-intro">
            <p>{{ info.title }} {{ info.package.intro }}...</p>
            <p class="add-info-intro-detail">颜色：{{ info.package.intro }}/ 数量：{{ info.count }}</p>
          </div>
        </div>
      </div>
      <div class="car-btn-group">
        <div></div>
        <div class="car-btn-row">
          <button class="btn-car btn-car-to-detail" @click="$router.go(-1)">返回商品</button>
          <router-link :to="{name:'ShoppingCartInfo'}">
            <button class="btn-car btn-car-to-pay">去购物车结算 ></button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!--商品推荐-->
  <div class="other-user-buy-box">
    <div class="other-user-buy-title">
      <p>可以顺便看下其他商品哦 ~</p>
    </div>
    <div class="other-user-buy-row" v-for="(items,index1) in recommend" :key="index1">
      <div class="other-user-buy-item-box" v-for="(item,index2) in items" :key="index2">
        <div class="other-user-buy-item-img">
          <a href="#"><img :src="item.img" alt=""></a>
        </div>
        <div class="other-buy-detail-box">
          <div class="other-buy-title">
            <a href="#">
              <p>{{ item.intro }}</p>
            </a>
          </div>
          <div class="other-buy-price">
            <p>￥{{ item.price }}</p>
          </div>
          <div class="other-buy-btn-box">
            <router-link to="/goodsDetail">
              <button class="other-buy-btn">
                <el-icon>
                  <ShoppingCart/>
                </el-icon>
                加入购物车
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchBar from "@/components/search/SearchBar.vue";

const info = {
  "skuId": 1663155939762,
  "title": "苹果8/7手机壳iPhone7 Plus保护壳全包防摔磨砂硬外壳",
  "count": 1,
  "package": {"img": "http://dummyimage.com/350x350", "intro": "4.7英寸-深邃蓝", "price": 28}
}

const recommend = [
  [
    {
      "img": "",
      "intro": "http://dummyimage.com/350x350",
      "price": 29
    }, {
    "img": "http://dummyimage.com/350x350",
    "intro": "苹果数据线 苹果iPhoneX/6s/7plus/8充电线",
    "price": 36
  }, {
    "img": "http://dummyimage.com/350x350",
    "intro": "苹果8/7/6/6s钢化膜 iphone8/7/6s/6钢化玻璃",
    "price": 19
  }, {
    "img": "http://dummyimage.com/350x350",
    "intro": "iPhone6s/7钢化膜苹果8 Plus手机膜抗蓝光非全屏",
    "price": 28
  }], [{
    "img": "http://dummyimage.com/350x350",
    "intro": "苹果6s手机壳iPhone6s Plus保护壳防摔全",
    "price": 28
  }, {
    "img": "http://dummyimage.com/350x350",
    "intro": "iPhone7/8手机壳手机套防摔磨砂保护壳星空黑☆全包保护",
    "price": 30
  }, {
    "img": "http://dummyimage.com/350x350",
    "intro": "数据线 适用于苹果iPhone 6s/6plus/7plus/8/X",
    "price": 18
  }, {
    "img": "http://dummyimage.com/350x350",
    "intro": "iPhone8/7/6S/6钢化膜 苹果8/7/6s/6玻璃膜 手机高",
    "price": 15
  }]];
</script>
<style scoped>
/****************************加入购物车页面开始*****************************/
.add-info-box-container {
  width: 100%;
  background-color: #F5F5F5;
}

.add-info-box {
  width: 90%;
  margin: 0px auto;
  padding: 15px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.add-info-detail {
  display: flex;
  flex-direction: column;
}

.add-info-title {
  font-size: 25px;
  color: #71b247;
}

.add-info-box-row {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.add-info-img {
  width: 56px;
  height: 56px;
  margin-right: 15px;
}

.add-info-img img {
  width: 100%;
}

.add-info-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.add-info-intro-detail {
  font-size: 12px;
  color: #999999;
}

.car-btn-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/*按钮*/
.btn-car {
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 0px;
  border: none;
  margin-right: 15px;
}

.btn-car-to-detail {
  background-color: #fff;
  color: #e4393c;
  border: 1px solid #fff;
}

.btn-car-to-detail:hover {
  border: 1px solid #e4393c;
}

.btn-car-to-pay {
  background-color: #e4393c;
  color: #fff;
  border: 1px solid #e4393c;
}

.btn-car-to-pay:hover {
  background-color: #c91623;
  border: 1px solid #c91623;
}

/*其他用户购买*/
.other-user-buy-box {
  width: 90%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
}

.other-user-buy-title {
  margin-top: 25px;
  font-size: 14px;
  color: #666;
  font-weight: bold;
}

.other-user-buy-row {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.other-user-buy-item-box {
  display: flex;
  flex-direction: row;
}

.other-user-buy-item-img {
  width: 96px;
  height: 96px;
}

.other-user-buy-item-img img {
  width: 100%;
}

.other-buy-detail-box {
  width: 160px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
}

.other-buy-title {
  font-size: 12px;
}

.other-buy-title a {
  color: #2c2c2c;
  text-decoration: none;
}

.other-buy-price {
  font-size: 12px;
  font-weight: bold;
  color: #E4393C;
}

.other-buy-btn {
  padding: 3px 10px;
  color: #E4393C;
  font-size: 12px;
  border: 1px solid #E4393C;
  border-radius: 0px;
  background-color: #fff;
}

.other-buy-btn:hover {
  color: #c91623;
  border: 1px solid #c91623;
}

/****************************加入购物车页面结束*****************************/
</style>
