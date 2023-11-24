<template>
    <div class="common-layout" style="height: 100%;width: 100%;margin-top: -20px;margin-left: -20px;">
      <el-container style="height: 100%; background-color: #f0f3f4;">
        <el-aside width="200px" style="height: 100%;">
        <SlideMenuShip/>
        </el-aside>
        <el-main>
          <ShipConfigureTraining/>
          <ShipNetwork style="margin-top: 30px;"/>
          <ShipReceiving style="margin-top: 30px;"/>
          <ShipSubmit style="margin-top: 30px;"/>
          <SignFor style="margin-top: 30px;"/>
          <ShipInspection style="margin-top: 30px;"/>
          <ShipContracts style="margin-top: 30px;"/>
          <ShipEvent style="margin-top: 30px;"/>

        </el-main>
      </el-container>
    </div>
  </template>
  <script lang="ts" setup>
  import ShipConfigureTraining from '@/components/ShipConfigureTraining.vue'
  import SlideMenuShip from '@/components/SlideMenuShip.vue'
  import ShipNetwork from '@/components/ShipNetwork.vue'
  import ShipReceiving from '@/components/ShipReceiving.vue'
  import ShipSubmit from '@/components/ShipSubmit.vue'
  import SignFor from '@/components/SignFor.vue'
  import ShipInspection from '@/components/ShipInspection.vue'
  import ShipContracts from '@/components/ShipContracts.vue'
  import ShipEvent from '@/components/ShipEvent.vue'

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