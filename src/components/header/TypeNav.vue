<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="inner-container">
      <!--仅在search路由下开启@mouseleave事件-->
      <!--@mouseenter无所谓-->
      <h2 class="all"
          @mouseleave="isTypeNavShow=(route.path.indexOf('/search')===-1)"
          @mouseenter="isTypeNavShow = true"
      >
        全部商品分类</h2>
      <nav class="nav">
        <a href="#">服装城</a>
        <a href="#">美妆馆</a>
        <a href="#">超市</a>
        <a href="#">全球购</a>
        <a href="#">闪购</a>
        <a href="#">团购</a>
        <a href="#">有趣</a>
        <a href="#">秒杀</a>
      </nav>
      <!--这里也要添加mouseleave，不然有bug-->
      <transition name="sort" @mouseenter="isTypeNavShow = true">
        <!--三级分类最外层div-->
        <div class="sort" @mouseleave="changeHoverId(false)" v-show="isTypeNavShow">
          <div class="all-sort-list2">
            <div class="item bo" v-for="(c1,index) in homeStore.$state.categoryList" :key="c1.categoryId"
                 :class="{'cur-c1':curId===c1.categoryId}">
              <h3 @mouseenter="changeHoverId(true,c1.categoryId)">
                <el-link :underline="false" @mouseenter="changeHoverId(true,c1.categoryId)"
                         @click="goCategory(1,c1.categoryId,c1.categoryName)"
                >{{ c1.categoryName }}
                </el-link>
              </h3>
              <!--二三级分类-->
              <el-card :style="{display:curId===c1.categoryId?'block':'none'}" shadow="never"
                       class="item-list clearfix">
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a href="#"
                         @click="goCategory(2,c2.categoryId,c2.categoryName)"
                      >{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a href="#"
                           @click="goCategory(3,c3.categoryId,c3.categoryName)"
                        >{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useIndexStore} from "@/stores/IndexStore";
import {ref, watch, watchEffect} from "vue";
import throttle from 'lodash/throttle'
import {useRoute} from 'vue-router';
import router from "@/router/MainRouter";

let homeStore = useIndexStore()
let route = useRoute()

let curId = ref(-1)

// 函数节流
const changeHoverId = throttle((isIn: boolean, categoryId?: number) => {
  curId.value = isIn ? categoryId : -1;  // ref引用变量要加 value 访问
}, 50)

const goCategory = (level: number, categoryId: number, categoryName: string) => {
  router.push({
    name: 'Search',
    query: {
      categoryName: categoryName,
      category1Id: level == 1 ? categoryId : undefined,
      category2Id: level == 2 ? categoryId : undefined,
      category3Id: level == 3 ? categoryId : undefined,
    },
  });
}

let isTypeNavShow = ref(route.path.indexOf("/search") === -1)

</script>
<style lang="less" scoped>


.type-nav {
  padding-bottom: 2px;
  border-bottom: 2px solid #e1251b;

  .inner-container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      margin-top: 10px;
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            z-index: 9999 !important;
            top: 0;
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;


            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }

        .cur-c1 {
          background: skyblue;
        }
      }
    }

    // sort 的过渡动画
    .sort-enter-active {
      transition: all 0.3s ease-out;
    }

    .sort-leave-active {
      transition: all 0.5s cubic-bezier(1, 0.3, 0.4, 1);
    }

    .sort-enter-from,
    .sort-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
  }
}
</style>
