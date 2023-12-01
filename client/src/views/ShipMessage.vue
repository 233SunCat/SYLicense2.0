<template>
    <div class="common-layout" style="height: 100%;width: 100%;margin-top: -20px;margin-left: -20px;">
      <el-container style="height: 100%; background-color: #f0f3f4;">
        <el-aside width="200px" style="height: 100%;">
        <SlideMenuShip/>
        </el-aside>
        <el-main>
          <ShipUserStatus />
          <ShipConfigureTraining v-if="shipConfigureTrainingPermission" style="margin-top: 30px;"/>
          <ShipNetwork style="margin-top: 30px;"/>
          <ShipReceiving style="margin-top: 30px;"/>
          <ShipEmail style="margin-top: 30px;"/>
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
  import ShipEmail from '@/components/ShipEmail.vue'
  import SignFor from '@/components/SignFor.vue'
  import ShipInspection from '@/components/ShipInspection.vue'
  import ShipContracts from '@/components/ShipContracts.vue'
  import ShipEvent from '@/components/ShipEvent.vue'
  import ShipUserStatus from '@/components/ShipUserStatus.vue'

  import {ref,provide,onMounted, reactive} from 'vue'
  import EventBus from "../assets/common/event-bus"
  import axiosServer from '../assets/common/axios-server'

const shipConfigureTrainingPermission = ref(true)
const userPermission = 2

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