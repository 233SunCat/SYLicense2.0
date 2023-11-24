<template>
    <div class="common-layout" style="height: 100%;width: 100%;">
      <el-container style="height: 100%; background-color: #f0f3f4;">
        <el-aside width="200px" style="height: 100%;">
        <SlideMenuTurn/>
        </el-aside>
        <el-main>
          <div style="display: flex; justify-content: center">
            <el-text class="mx-1" style="font-size: 20px;font-Weight: bold">{{prototypeName}}</el-text>
            <el-tag style="margin: 10px">在保</el-tag>
            <br />
            <el-tag style="margin: 10px" class="ml-2" type="warning">已维修</el-tag>
          </div>
          <div style="height: 6%; display: flex; justify-content: center">
            <el-tag class="ml-2" type="info">{{ prototype }}</el-tag>
            <el-tag class="ml-2" type="info">{{ prototypeMode }}</el-tag>
            <el-tag class="ml-2" type="info">{{manufactureDate}}</el-tag>
            <el-tag class="ml-2" type="info">{{ location }}</el-tag>
          </div>
          <div style="height: 3%; display: flex; justify-content: center">
            <el-text style="color:#8175c7" tag="ins">当前流转在途：发往|{{destination}}|</el-text>
          </div>
          <ConfigureTraining/>
          <ConfigureSearch style="margin-top: 20px;"/>
        </el-main>
      </el-container>
    </div>
  </template>
  <script lang="ts" setup>
  import ConfigureSearch from '@/components/ConfigureSearch.vue'
  import ConfigureTraining from '@/components/ConfigureTraining.vue'
  import ConfigureHeader from '@/components/ConfigureTraining.vue'
  import SlideMenuTurn from '@/components/SlideMenuTurn.vue'
  import axios from 'axios'
  import {ref,provide,onMounted} from 'vue'
  import EventBus from "../assets/common/event-bus"
  
  
  const prototypeName = "123456"
  const prototype = "123456"
  const prototypeMode = "123456"
  const manufactureDate = "123456"
  const location = "123456"
  const destination = ""//目的地
  
  
  //样机流转信息
  const PrototypeWork = () => {
    const data = new FormData()
    axios(
      {
        url: '/Equipment/EquipmentSubmit',
        data: data,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log(res.data)
      })
  }
  //通信-page-slide
  onMounted(() => {  
    EventBus.emit('message', [{id:0,name:'镜头训练'},{id:1,name:'基础技能训练'}]);  
  });  
  </script>
  <style lang="less">
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  </style>