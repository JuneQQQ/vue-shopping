<template>
  <el-row class="bottom">
    <el-col :span="6">
      <h1 class="logoArea">
        <RouterLink :to="{name:'Index'}" class="logo" title="京西臻选">
          <el-image src="/images/logo/logo500x188.png" alt="" style="width: 160px;" />
        </RouterLink>
      </h1>
      <div class="grid-content ep-bg-purple-dark"/>
    </el-col>
    <el-col :span="16">
      <!--      <el-button-->
      <!--          :type="'danger'"-->
      <!--          @click="search"-->
      <!--          @keydown.enter="search"-->
      <!--      >111</el-button>-->
      <el-input
          v-model.trim="searchStore.$state.searchParam.keyword"
          placeholder="手机"
          size="large"
          :autofocus="true"
          type="danger"
          @keydown.enter="search"
      >
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button
          style="float:left"
          type="danger"
          size="large"
          @click="search"
      >
        搜索
        <el-icon>
          <Search/>
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import router from "@/router/MainRouter";
import debounce from "lodash/debounce"
import {useRoute} from 'vue-router';
import {computed, reactive, watch, watchEffect} from "vue";
import {useSearchStore} from "@/stores/SearchStore";
import SearchBar from "@/components/search/SearchBar.vue";

let searchStore = useSearchStore()
let route = useRoute()

// 监听路由变化，更新pinia存储的searchParam参数
watch(
    () => route.query,
    (to, from) => {
      if (route.query.category1Id) searchStore.$patch((state) => {
        state.searchParam.category1Id = Number(route.query.category1Id)
      })
      if (route.query.category2Id) searchStore.$patch((state) => {
        state.searchParam.category2Id = Number(route.query.category2Id)
      })
      if (route.query.category3Id) searchStore.$patch((state) => {
        state.searchParam.category3Id = Number(route.query.category3Id)
      })
      if (route.query.categoryName) searchStore.$patch((state) => {
        state.searchParam.categoryName = Number(route.query.categoryName)
      })
    }
)

// watchEffect( () => {
//   searchParam.category1Id = route.query.category1Id ? Number(route.query.category1Id) : undefined
//   searchParam.category2Id = route.query.category2Id ? Number(route.query.category2Id) : undefined
//   searchParam.category3Id = route.query.category3Id ? Number(route.query.category3Id) : undefined
//   searchParam.categoryName = route.query.categoryName ? String(route.query.categoryName) : undefined
// })


const search = debounce(() => {
  // https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
  // vue3 2022-8-22 已经把params砍了，推荐使用历史记录代替，请注意
  console.log("click search")
  router.push({name: 'Search'});  // 路由跳转
  searchStore.getSearchResult()   // 发请求
}, 100)
</script>

<style lang="less" scoped>

.bottom {
  align-items: center;
  width: 1200px;
  margin: 20px auto;
  overflow: hidden;

  .logoArea {
    float: left;

    .logo {
      img {
        width: 175px;
        margin: 25px 45px;
      }
    }
  }

  .searchInput {
    height: 40px;
  }
}
</style>
