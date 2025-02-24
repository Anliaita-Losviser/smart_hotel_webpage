

<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {ArrowRight} from "@element-plus/icons-vue";
//获取当前路由
const route = useRoute();
const tabs = ref([]);
const getBreadcrumb = ()=>{
  let matched = route.matched.filter(item => item.meta && item.meta.title);
  console.log(matched);

  const first = matched[0];
  if((first == null )||(first.path !== "/home")){
    matched = [{path: "/home",meta:{title: "首页"}}].concat(matched)
  }
  //设置面包屑数据
  tabs.value = matched;
  console.log(tabs.value);
}
//监听路由变化，当路径发生变化时，调用回调
getBreadcrumb();
watch(
  ()=> route.path,
  ()=> getBreadcrumb(),
)
</script>

<template>
  <el-divider style="margin: 8px"/>
  <el-breadcrumb :separator-icon="ArrowRight" class="bread">
    <el-breadcrumb-item :to="{ path: item.path }" :key="item.title" v-for="item in tabs">
      {{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <el-divider style="margin: 8px"/>
</template>

<style lang="less">
.bread {
  margin-left: 12px;
}
</style>