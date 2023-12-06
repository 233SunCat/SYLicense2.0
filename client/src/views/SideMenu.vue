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
            <el-icon><Menu /></el-icon>           
             <span>产品模块</span>
          </template>
          <router-link style="  text-decoration: none;" to="/ProductModule"><el-menu-item index="1-2">产品模块管理</el-menu-item></router-link>
        </el-sub-menu>
        <el-sub-menu index="2" height="100%">
          <template #title>
            <el-icon><Van /></el-icon>            
            <span>发货信息</span>
          </template>
          <router-link style="  text-decoration: none;" to="/ShipAdd"><el-menu-item  index="2-1">新增用户</el-menu-item></router-link>
          <router-link style="  text-decoration: none;" to="/ShipMessage"><el-menu-item  index="2-2">发货信息</el-menu-item></router-link>
          <router-link style="  text-decoration: none;" to="/ShipSearch"><el-menu-item  index="2-3">用户总表</el-menu-item></router-link>
        </el-sub-menu>
        <el-sub-menu index="3" height="100%">
          <template #title>
            <el-icon><Tools /></el-icon>            
            <span>设备报修</span>
          </template>
          <router-link style="  text-decoration: none;" to="/Equipment/EquipmentSubmit"><el-menu-item index="3-1">报修登记</el-menu-item></router-link>
          <router-link style="  text-decoration: none;" to="/Equipment/EquipmentSearch"><el-menu-item index="3-2">报修记录</el-menu-item></router-link>
        </el-sub-menu>
        <el-sub-menu index="4" height="100%">
          <template #title>
            <el-icon><Orange /></el-icon>            
            <span>样机流转</span>
          </template>
          <router-link style="  text-decoration: none;" to="/ModelAdd"><el-menu-item index="4-1">新建样机</el-menu-item></router-link>
          <router-link style="  text-decoration: none;" to="/MTapply"><el-menu-item index="4-2">样机申请</el-menu-item></router-link>
          <router-link style="  text-decoration: none;" to="/MTmessage"><el-menu-item index="4-3">样机流转信息</el-menu-item></router-link>
        </el-sub-menu>
        <el-sub-menu index="5" height="100%">
          <template #title>
            <el-icon><User /></el-icon>            
            <span>用户权限</span>
          </template>
          <router-link style="  text-decoration: none;" to="/PermissionsSearch"><el-menu-item index="5-1">待开权限</el-menu-item></router-link>
          <router-link style="  text-decoration: none;" to="/ModelApply"><el-menu-item index="5-2">审核权限</el-menu-item></router-link>
        </el-sub-menu>
      </el-menu>
</template>

<script lang="ts" setup>
import {
  Menu,Van,Orange,Tools,User
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style>
</style>
