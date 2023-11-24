<template>
  <div id="app">
        <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import SideMenu from '@/views/SideMenu.vue'
import ForceFeedback from '@/views/ForceFeedback.vue'
import UserAdd from '@/views/UserAdd.vue'
import EquipmentSubmit from './views/EquipmentSubmit.vue'
import EquipmentSearch from './views/EquipmentSearch.vue'
</script>
<style lang="less">
  html,body,#app{
   height: 100%;
   width: 100%;
  margin: 0;
}
</style>