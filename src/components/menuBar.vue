<template>
  <div class="expandButton">
    <el-icon :size="24" style="width: 100%; height: 100%">
      <Expand
        @click="changeCollapse"
      />
    </el-icon>
  </div>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/">
        <el-icon><Grid /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="hotelManagement">
      <template #title>
        <el-icon><IconMenu /></el-icon>
        <span>酒店管理</span>
      </template>

      <el-menu-item index="typeOfRoom">
        <el-icon><HomeFilled /></el-icon>
        <span>房间类型</span>
      </el-menu-item>
      <el-menu-item index="floorManage">
        <el-icon><Files /></el-icon>
        <span>楼层管理</span>
      </el-menu-item>
      <el-menu-item index="roomsManage">
        <el-icon><Operation /></el-icon>
        <span>房间管理</span>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="systemManagement">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>系统管理</span>
      </template>

      <el-menu-item index="employeeManage">
        <el-icon><User /></el-icon>
        <span>员工管理</span>
      </el-menu-item>
      <el-menu-item index="characterManage">
        <el-icon><UserFilled /></el-icon>
        <span>角色管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
//import { useRoute } from "vue-router";
import {
  Expand,
  Menu as IconMenu,
  Setting,
  Files,
  HomeFilled,
  Operation,
  User,
  UserFilled,
  Grid,
} from "@element-plus/icons-vue";

//const route = useRoute();
const isCollapse = ref(true);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style lang="less">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
}
.el-menu-vertical {
  border: none;
}

.expandButton {
  margin: 1px;
  width: 59px;
  height: 54px;
  align-items: center;
  justify-content: center;
}
</style>