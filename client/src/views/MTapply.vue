<template>
    <div class="common-layout" style="height: 100%;width: 100%; background-color: #f0f3f4;">
          <MTapplyAdd/>
          <MTapplySearch style="margin-top: 20px;"/>
    </div>
  </template>
  <script lang="ts" setup>
  import MTapplyAdd from '@/components/MTapplyAdd.vue'
  import MTapplySearch from '@/components/MTapplySearch.vue'
  import axios from 'axios'
  import {ref,provide,onMounted} from 'vue'  
  
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