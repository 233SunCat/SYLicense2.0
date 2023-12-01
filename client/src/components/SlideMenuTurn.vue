<template>
  <el-menu default-active="null" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    background-color="#f3f5f6" style="height: 100%;">
    <el-sub-menu :index="key" v-for="item,key in menus" :key="key">
      <template #title>
        <span>{{ item.modelName }}</span>
      </template>
      <el-menu-item :index="subKey" v-for="subItem,subKey in item.children" :key="subKey"
        @click="handleMenuItemClick(subItem)">
        <template #title>
          <span>{{ subItem.modelId }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
  
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import axios from "axios";
import { ref, reactive, provide, inject, onMounted } from 'vue';
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import messageBox from '../assets/common/message-box'
import * as constants from '../constants.json';
import funBox from '../assets/common/fun-box'
import EventBus from "../assets/common/event-bus"

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
var menus = ref();

/**
 * 加载侧边栏
 */
const ShipMenuSlide = () => {//返回时间，用户
  axiosServer.AxiosGet('/Model/ModelMenu').then(collection => {
    console.log('样机侧边栏', collection)
    const transformedData = collection.reduce((result, item) => {
  // 找到已经存在的 modelName 对象
  const existingModel = result.find((model) => model.modelName === item.modelName);

  // 如果找到了，将当前 item 添加到它的 children 中
  if (existingModel) {
    existingModel.children.push(item);
  } else {
    // 如果没有找到，创建一个新的 modelName 对象并加入 result 数组
    result.push({
      modelName: item.modelName,
      children: [item]
    });
  }

  return result;
}, []);
    menus.value = transformedData
    console.log('transformedData',transformedData)
  })
}
/**
 * 侧边栏触发事件
 * @param menuItem  
 */
 const handleMenuItemClick = (menuItem: any) => {
  //emit('add', shuzu)
  // 这里处理菜单项的点击事件  
  EventBus.emit("slide-model", { 
    modelName: menuItem.modelName, 
    modelId: menuItem.modelId,
    inventoryStatus:menuItem.inventoryStatus,
    modelStyle: menuItem.modelStyle, 
    produceDate: menuItem.produceDate,
    produceLocation:menuItem.produceLocation,
    softwareVersion: menuItem.softwareVersion, 
    processorSerialNumber: menuItem.processorSerialNumber,
    hardDriveSerialNumber:menuItem.hardDriveSerialNumber,
    modelModule: menuItem.modelModule, 
    notes: menuItem.notes,
  });
}
ShipMenuSlide()
</script>
  