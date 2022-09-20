<template>
  <header class="box">
    <div class="nav">
      <!--定位信息-->
      <ul class="location">
        <li>
          <el-link :underline="false" style="margin-top: -18px" @click="router.push({name:'Index'})">
            <el-icon :size="18">
              <HomeFilled/>
            </el-icon>
            京西商城
          </el-link>
        </li>

        <li>
          <el-dropdown>
            <el-link :underline="false">
              <el-icon :size="18">
                <LocationFilled/>
              </el-icon>
              {{ city }}
            </el-link>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(items, index) in cityArr" :key="index">
                  <div class="city">
                  <span v-for="(curCity, index) in items" class="city-item" :key="index"
                        @click="changeCity(curCity)">{{ curCity }}</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>


      <!--用户信息-->
      <ul class="user">
        <!--未登录-->
        <li class="first" v-show="!userStore.userInfo.nickName">
          <el-icon :size="18">
            <Avatar/>
          </el-icon>
          您好，请
          <router-link :to="{name:'Login'}"
                       style="text-decoration:none;">
            登录
          </router-link>
          |
          <span class="text-color-red">
            <router-link :to="{name:'Register'}" style="text-decoration:none;">
              免费注册
          </router-link>
          </span>
        </li>

        <!--已登录 显示简要信息-->
        <li v-show="userStore.userInfo.nickName">
          欢迎您，
          <el-dropdown>
            <p class="username-p" >
              <el-icon :size="15">
                <Avatar/>
              </el-icon>
              <span class="username">{{ userStore.userInfo.nickName }} </span>
            </p>
            <template #dropdown>
              <el-dropdown-menu style="background-color:whitesmoke" effect="dark">
                <el-dropdown-item>
                  <div class="my-page">
                    <div class="my-info" @click="goUserHome">
                      <el-icon :size="18">
                        <HomeFilled/>
                      </el-icon>
                      <p>我的主页</p>
                    </div>
                    <div class="sign-out" @click="logout">
                      <el-icon :size="18">
                        <SwitchButton/>
                      </el-icon>
                      <p>退出登录</p>
                    </div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>

        <!--已登录 显示购物车-->
        <li  v-show="userStore.userInfo.token">
          <el-dropdown @visible-change="showShoppingCartInfo">
            <span style="line-height: 35px;">
                <RouterLink  :to="{name:'ShoppingCartInfo'}"  style="vertical-align: center;text-decoration: none">
                  <el-icon>
                    <ShoppingCart/>
                  </el-icon>
                  购物车
                </RouterLink>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="shopping-cart-null" v-show="!userStore.shoppingCartInfo.length">
                  <el-icon class="cart-null-icon">
                    <ShoppingCart/>
                  </el-icon>
                  <span>你的购物车没有空空哦</span>
                  <span>赶快去添加商品吧~</span>
                </div>
                <div class="shopping-cart-list" v-show="userStore.shoppingCartInfo.length" >
                  <div class="shopping-cart-box" v-for="(item,index) in userStore.shoppingCartInfo" :key="index">
                    <div class="shopping-cart-img">
                      <el-image :src="item.img"/>
                    </div>
                    <div class="shopping-cart-info">
                      <div class="shopping-cart-title">
                        <p>{{ item.title.substring(0, 22) }}...</p>
                      </div>
                      <div class="shopping-cart-detail">
                        <p>
                          数量:
                          <span class="shopping-cart-text">
                                  {{ item.count }}
                                </span>
                          价钱:
                          <span class="shopping-cart-text">
                                  {{ item.singlePrice * item.count }}
                                </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="go-to-buy">
                    <el-button type="danger" size="small" @click="router.push({name:'ShoppingCartInfo'})">
                      去购物车结算
                    </el-button>
                  </div>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>

        <!--其他标签-->
        <li>
          <router-link style="text-decoration:none" :to="{name:'Feedback'}">意见反馈</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import router from "@/router/MainRouter";
import {useUserStore} from "@/stores/UserStore";
import {ref} from "vue"

const userStore = useUserStore()
const showShoppingCartInfo = (visible:boolean)=>{
  if (visible){
    // 刷新购物车状态
    userStore.getShoppingCartInfo()
  }
}

const logout = () => {
  // @ts-ignore
  userStore.userInfo = {}
  router.push({name:'Index'})
}

const goUserHome = () => {
  router.push({name: 'UserHome'})
}

const city = ref('珠海')
const cityArr = [
  ['北京', '上海', '天津', '重庆', '广州'],
  ['深圳', '河南', '辽宁', '吉林', '江苏'],
  ['江西', '四川', '海南', '贵州', '云南'],
  ['西藏', '陕西', '甘肃', '青海', '珠海']
]
const changeCity = (chooseCity: string) => {
  city.value = chooseCity
}


</script>

<style lang="less" scoped>
.el-link{
  //color: black !important;
}
.el-icon {
  vertical-align: middle;
}
.box {
  width: 100%;
  height: 35px;
  background-color: #e3e4e5;
}

.nav {
  margin: 0% auto;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav ul {
  list-style: none;
}

.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold;
}

.nav a {
  text-decoration: none;
  color: #999999;
  padding-left: 15px;
  cursor: pointer;
}

.nav a:hover {
  color: #d9534f;
}

.location {
  margin-top: 0.5%;
  color: #999999;
}

.icon {
  color: #d9534f;
}

.first {
  color: #999999;
}

.first a:first-child {
  padding-left: 3px;
  border-left: none;
}

.city {
  padding: 10px 15px;
}

.city-item {
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
}

.city-item:hover {
  color: #005eb7;
}

.person-icon {
  color: #d9534f;
  background-color: #f0cdb2;
}

.username {
  color: gray();
  margin-top: -5px;
}

.shopping-cart-list {
  padding: 3px 15px;
  background-color: whitesmoke
}

.shopping-cart-box {
  margin: 8px 0px;
  margin-top: 15px;
  padding-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px #ccc dotted;
}

.shopping-cart-box:first-child {
  margin-top: 8px;
}

.shopping-cart-img {
  margin-right: 15px;
  width: 40px;
  height: 40px;
}

.shopping-cart-img img {
  width: 100%;
}

.shopping-cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  width: 200px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
}

.shopping-cart-detail {
  color: #999999;
}

.shopping-cart-text {
  color: #ccc;
}

.go-to-buy {
  display: flex;
  justify-content: flex-end;
}

.shopping-cart-null {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cart-null-icon {
  font-size: 38px;
  margin-bottom: 15px;
}

.shopping-cart-null span {
  color: #999999;
  font-size: 12px;
  line-height: 16px;
}

.username-p {
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
}

.my-page {
  padding: 3px 5px;
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-page a {
  margin: 0px;
  padding: 0px;
  border: none;
}

.my-info {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}

.my-info:hover {
  box-shadow: 0px 0px 5px #ccc;
}

.my-info i {
  font-size: 28px;
}

.my-info p {
  font-size: 12px;
}

.sign-out {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}

.sign-out:hover {
  box-shadow: 0px 0px 5px #ccc;
}

.sign-out i {
  font-size: 28px;
}

.sign-out p {
  font-size: 12px;
}
</style>
