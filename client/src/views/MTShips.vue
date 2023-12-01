<template>
    <div class="common-layout" style="height: 100%;width: 100%; background-color: #f0f3f4;">
      <MTapplyMessages />
      <MTapplyReceiving />
      <MTapplyEmail />
      <MTapplySignfor />
    </div>
  </template>
  <script lang="ts" setup>
  import MTapplyMessages from '@/components/MTapplyMessages.vue'
  import MTapplyAddL from '@/components/MTapplyAddL.vue'
  import axios from 'axios'
  import { ref, provide, onMounted } from 'vue'
  import MTapplyReceiving from '@/components/MTapplyReceiving.vue';
  import MTapplyEmail from '@/components/MTapplyEmail.vue';
  import MTapplySignfor from '@/components/MTapplySignfor.vue';
  
  import { useRouter, useRoute } from 'vue-router';
  
  const route = useRoute();
  console.log('route.query.applyNameApply',route.query.applyNameApply)
  console.log('ships的',route.query.modelId)
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