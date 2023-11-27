<template>
  <div
    class="common-layout"
    style="height: 100%; width: 100%; margin-top: -20px; margin-left: -20px"
  >
    <el-container style="height: 100%; background-color: #f0f3f4">
      <el-aside width="200px" style="height: 100%">
        <SlideMenuProduct />
      </el-aside>
      <el-main>
        <ProductModuleSearch />
      </el-main>
    </el-container>
  </div>
</template>
  <script lang="ts" setup>
import ProductModuleSearch from "@/components/ProductModuleSearch.vue";
import SlideMenuProduct from "@/components/SlideMenuProduct.vue";
import ShipNetwork from "@/components/ShipNetwork.vue";
import ShipReceiving from "@/components/ShipReceiving.vue";
import ShipSubmit from "@/components/ShipEmail.vue";
import SignFor from "@/components/SignFor.vue";
import ShipInspection from "@/components/ShipInspection.vue";
import ShipContracts from "@/components/ShipContracts.vue";
import ShipEvent from "@/components/ShipEvent.vue";

import axios from "axios";
import { ref, provide, onMounted, reactive } from "vue";
import EventBus from "../assets/common/event-bus";
import axiosServer from "../assets/common/axios-server";

const prototypeName = "123456";
const prototype = "123456";
const prototypeMode = "123456";
const manufactureDate = "123456";
const location = "123456";
const destination = ""; //目的地

//样机流转信息
const PrototypeWork = () => {
  const data = new FormData();
  axios({
    url: "/Equipment/EquipmentSubmit",
    data: data,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    console.log(res.data);
  });
};
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