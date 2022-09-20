<template>
  <SearchBar></SearchBar>
  <el-card class="mycard">

    <TypeNav></TypeNav>
    <ListContainer></ListContainer>

  </el-card>

  <!--以下三个模块暂未实现细节-->
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>

  <Floor v-for="(floor, index) in indexStore.floorList" :key="index" :floor="floor">
  </Floor>
  <Brand></Brand>
</template>
<script setup lang="ts">
import TypeNav from '@/components/header/TypeNav.vue'
import ListContainer from '@/components/index/ListContainer.vue'
import Recommend from '@/components/index/Recommend.vue'
import Rank from '@/components/index/Rank.vue'
import Like from '@/components/index/Like.vue'
import Floor from '@/components/index/Floor.vue'
import Brand from '@/components/index/Brand.vue'
import {useIndexStore} from "@/stores/IndexStore";
import SearchBar from "@/components/search/SearchBar.vue";
import {ElMessage} from 'element-plus';

const indexStore = useIndexStore();

</script>
<style lang="less" scoped>
.mycard {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  overflow: hidden;
  height: auto;
  line-height: 0;
  position: relative;
}
</style>
