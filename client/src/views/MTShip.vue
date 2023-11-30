<template>
    <div class="common-layout" style="height: 100%;width: 100%; background-color: #f0f3f4;">
          <MTapplyMessage/>
          <MTapplyAddL/>
    </div>
  </template>
  <script lang="ts" setup>
  import MTapplyMessage from '@/components/MTapplyMessage.vue'
  import MTapplyAddL from '@/components/MTapplyAddL.vue'
  import axios from 'axios'
  import {ref,provide,onMounted} from 'vue'  

  
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