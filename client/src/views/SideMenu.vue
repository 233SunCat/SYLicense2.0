<template>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        style="height: 100%;"
      >
      <el-menu-item index="0">
        <p><strong style="font-family: '楷体';font-size: 26px;">Sooyan 授权管理系统</strong></p>
        </el-menu-item>
        <el-sub-menu index="1" height="100%">
          <template #title>
            <el-icon><location /></el-icon>
            <span>产品模块</span>
          </template>
          <!-- <router-link to="/ForceFeedback"><el-menu-item index="1-1">力反馈腹腔镜</el-menu-item></router-link> -->
          <router-link to="/ForceFeedback"><el-menu-item index="1-2">虚实结合腹腔镜</el-menu-item></router-link>
            <el-menu-item index="1-3">消化内镜</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2" height="100%">
          <template #title>
            <el-icon><location /></el-icon>
            <span>发货信息</span>
          </template>
          <router-link to="/UserAdd"><el-menu-item index="1-1">新增用户</el-menu-item></router-link>
        </el-sub-menu>
        <el-menu-item index="3">
          <el-icon><icon-menu /></el-icon>
          <span>发货信息</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
