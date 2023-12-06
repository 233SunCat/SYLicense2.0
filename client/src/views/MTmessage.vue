<template>
  <div class="common-layout" style="height: 100%;width: 100%;margin-top: -20px;margin-left: -20px;">
    <el-container style="height: 100%; background-color: #f0f3f4;">
      <el-aside width="200px" style="height: 100%;">
        <SlideMenuTurn />
      </el-aside>
      <el-main>
        <div style="display: flex; justify-content: center;height: 10%;">
          <el-text class="mx-1" style="font-size: 20px;font-Weight: bold">样机 {{ formInline.modelId }}</el-text>
        </div>
        <div style="height: 6%; display: flex; justify-content: center">
          <el-tag class="ml-2" type="info" style="margin-right: 20px;">设备名称：{{ formInline.modelName}}</el-tag>
          <el-tag class="ml-2" type="info" style="margin-right: 20px;">设备型号：{{ formInline.modelStyle }}</el-tag>
          <el-tag class="ml-2" type="info" style="margin-right: 20px;">生产日期：{{ formInline.produceDate }}</el-tag>
          <el-tag class="ml-2" type="info" style="margin-right: 20px;">当前位置：{{ location }}</el-tag>
        </div>
        <div style="height: 3%; display: flex; justify-content: center">
          <el-text style="color:#8175c7" tag="ins">当前流转在途：发往|{{ destination }}|</el-text>
        </div>
        <ConfigureTraining />
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import ConfigureTraining from '@/components/ConfigureTraining.vue'
import SlideMenuTurn from '@/components/SlideMenuTurn.vue'
import axios from 'axios'
import { ref, provide, onMounted, reactive } from 'vue'
import EventBus from "../assets/common/event-bus"

var formInline = reactive({
  //这里就是获取的数据
  modelName: "",
  modelId: "",
  modelStyle: "",
  produceDate: "",
});
const modelName = ref('11111')
const protextTime = ref('在保')
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
  EventBus.emit('message', [{ id: 0, name: '镜头训练' }, { id: 1, name: '基础技能训练' }]);
});
/**
* 加载
*/
EventBus.on('slide-model', async (val: any) => {
  formInline.modelName = val.modelName
  formInline.modelStyle = val.modelStyle
  formInline.produceDate = val.produceDate
  formInline.modelId = val.modelId

})
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