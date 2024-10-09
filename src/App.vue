<script setup>
import menuBar from '@/components/menuBar.vue';
import BreadCrumb from './components/BreadCrumb.vue';
</script>

<template>
  <el-container class="layout">
    <!-- 边栏 -->
    <el-aside class="aside" width="collapse">
      <menuBar></menuBar>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <BreadCrumb></BreadCrumb>
      </el-header>
      <!-- 内容 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
.layout {
  height: 100%;
  .aside {
    background-color: darkcyan;
  }
  .header {
    background-color: darkcyan;
    align-content: center;
  }
  .main {
    background-color: wheat;
  }
}
</style>
