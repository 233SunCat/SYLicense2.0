<template>
  <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
    <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
      style="max-width: 460px;width: 40%;">
      <el-form-item label="选择时间">
        <el-date-picker style="width: 100%;" v-model="formInline.eventDate" type="date" placeholder="请选择时间" clearable />
      </el-form-item>
      <el-form-item label="事件描述">
        <el-input type="textarea" style="width: 100%;" v-model="formInline.eventDescription" placeholder="请填写事件描述"
          clearable />
      </el-form-item>
      <el-form-item label="费用估算/元">
        <el-input style="width: 100%;" v-model="formInline.eventUsedMoney" placeholder="请填写估算值" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
        <el-button type="primary" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
//模块
import { ref, reactive } from 'vue'
import axios from "axios";
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import EventBus from "../assets/common/event-bus"
import { defineProps, defineEmits } from 'vue';
import funBox from '../assets/common/fun-box'
import messageBox from '../assets/common/message-box'

//数据
const formInline = reactive({//这里就是获取的数据
  eventDate: Date(),
  eventDescription: '',
  eventUsedMoney: '',
})
//事件


const onCancel = () => {
  console.log('取消')
}
//通信区域
//接受请求

//发送请求

var orderDate = null
var clientName = ''
var props = defineProps(['message'])

const onSubmit = () => {//提交
  clientName = props.message.clientName
  orderDate = props.message.orderDate
  const formInlineFields = Object.keys(formInline);
  if (funBox.checkRequiredFields(formInline, formInlineFields)) { return }
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipEvent').then(res => {
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
}


</script>
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
