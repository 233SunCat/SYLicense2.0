<template>
  <el-menu default-active="2" class="el-menu-vertical-demo"
    background-color="#f3f5f6" style="height: 100%;">
        <el-menu-item index="1" v-for="item in menus" :key="item" @click="handleMenuItemClick(item)">
          <span>{{item}}</span>
        </el-menu-item>
  </el-menu>
</template>
  
<script lang="ts" setup>
import axios from "axios";
import { ref, reactive, provide, inject, onMounted } from 'vue';
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import { result } from 'lodash';

var menus = ref(['力反馈腹腔镜','虚实结合腹腔镜',]);
// 定义分组的类型接口  



//通信-page-slide
onMounted(() => {
  const handleMessage = (message: string) => {//

  };
  //EventBus.on('message', handleMessage); 
})
const handleMenuItemClick = (item: any) => {
  console.log("点击了菜单项：", item);
  EventBus.emit("slide-product", { equipmetnName: item});
}
/**
 * 加载侧边栏
 */
const ShipMenuSlide = () => {//返回时间，用户
}
ShipMenuSlide()

</script>
  