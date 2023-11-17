<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-aside style="border-color: aqua;height: 100%;"><SideMenu/></el-aside>
      <el-main style="height: 100%;" >
        <!-- <el-row type="flex" justify="center" align="middle" style="height: 100%;" > -->
        <el-row style="height: 100%;" >
        <!-- <UserAdd/> -->
        <router-view/>
      </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideMenu from '@/views/SideMenu.vue'
import ForceFeedback from '@/views/ForceFeedback.vue'
import UserAdd from '@/views/UserAdd.vue'
import EquipmentSubmit from './views/EquipmentSubmit.vue'
import EquipmentSearch from './views/EquipmentSearch.vue'
export default defineComponent({
  name: 'App',
  components: {
      SideMenu,
      //ForceFeedback,
      //UserAdd,
  }
})
</script>
<style lang="less">
  html,body,#app{
   height: 100%;
   width: 100%;
  margin: 0;
}
</style>