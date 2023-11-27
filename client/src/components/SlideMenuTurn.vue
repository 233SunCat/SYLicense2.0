<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#f3f5f6"
      style="height: 100%;"
    >
      <el-sub-menu :index="item.id+''"  v-for="item in menus" :key="item.id">
        <template #title>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="subItem.id+''"  v-for="subItem in item.children" :key="subItem.id" @click="handleMenuItemClick(subItem)" >
          <template #title>
          <span>{{subItem.name}}</span>
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
  import {ref, reactive, provide ,inject,onMounted} from 'vue';
import EventBus from "../assets/common/event-bus"

  const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  }
  var menus = ref([{id:1 ,name:'力反馈',children:[{id:1,name:'11111'},{id:2,name:'22222'}]},{id:2,name:'虚实结合'},{id:3,name:'消化内镜'}]);
  
  //get axios data
      // axios.get('/')
      //     .then(response => {
      //         console.log(response)
      //         menus = response.data;
      //     })
      //     .catch(error => {
      //         console.error(error)
      //     })
const shuzu = reactive({ title: '123' })
const handleMenuItemClick=(menuItem: any) =>{  
    //emit('add', shuzu)
      // 这里处理菜单项的点击事件  
      //console.log("点击了菜单项：", menuItem.name);  
      EventBus.emit("slide-training", [{id:0,name:'镜头训练'},{id:1,name:'基础技能训练'},{id:2,name:'缝合打结训练'},{id:3,name:'乙状结肠手术训练'}]);
} 
//通信-page-slide
onMounted(() => {  
  const handleMessage = (message: string) => {  
    //console.log('加载输出数据',message)
  };  
  EventBus.on('message', handleMessage); 
}) 

</script>
  