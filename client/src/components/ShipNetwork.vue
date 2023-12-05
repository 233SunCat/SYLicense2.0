<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">设备联网及质保</el-text>
      </el-header>
      <el-main style="background-color: #ffffff;">
        <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
          <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
            style="max-width: 460px;width: 40%;">
            <el-form-item label="是否联网">
              <el-radio-group v-model="equipmentNetwork" class="ml-4">
                <el-radio label="是" size="large">是</el-radio>
                <el-radio label="否" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联网设备台数">
              <el-input style="width: 100%;" v-model="formInline.networdkEqNumber" placeholder="选择联网设备数量" clearable
                @input="InputChange(formInline.networdkEqNumber)" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="联网设备编号">
              <el-row :gutter="5" style="width: 100%">
                <el-col :span="8" v-for="item, index in formInline.equipmentIds" :key="index">
                  <el-input style="width: 100%" v-model="formInline.equipmentIds[index]" clearable :disabled="disabled" />
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="质保期">
              <el-row :gutter="5" style="width: 100%">
                <el-col :span="8">
                  <el-input type="number" min="0" style="width: 100%;" v-model="formInline.protectTime"
                    placeholder="请输入数字" clearable @input="PeriodInput" :disabled="disabled" />
                </el-col>
                <el-col :span="3">
                  <el-text>年</el-text>
                </el-col>
                <el-col :span="11">
                  <el-text>质保剩余时间: {{ time }}</el-text>
                </el-col>
              </el-row>

            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="NetworkUpdate" :disabled="disabled">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
//模块
import { ref, reactive } from 'vue'
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import EventBus from "../assets/common/event-bus"
import * as constants from '../constants.json';
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'
import { useRouter, useRoute } from 'vue-router';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
//数据
const time = ref('')
const disabled = ref(false)
const labelPosition = ref<FormProps['labelPosition']>('right')
interface FormInlineData {
  networdkEqNumber: number;
  equipmentIds: string[];
  protectTime: number;
  equipmentNetwork: string;
}
const formInline = reactive<FormInlineData>({//这里就是获取的数据
  networdkEqNumber: 0,
  equipmentIds: [],
  protectTime: 3,
  equipmentNetwork: '是'
})
const equipmentNetwork = ref('是')

const InputChange = (num: any) => {//输入框触发
  formInline.equipmentIds = Array.from({ length: num }, () => "");
}
function daysToYearsMonthsDays(days: number): { years: number, months: number, days: number } {
  const duration = dayjs.duration(days, 'days');
  const years = duration.years();
  const months = duration.months();
  const remainingDays = duration.days();

  return { years, months, days: remainingDays };
}

const formInlineCopy = formInline
var orderDate = null
var clientName = ''
const HanderBus = async (val: any) => {
    orderDate = val.orderDate
    clientName = val.clientName
    console.log('联网加载')
    //EventBus.off('slide-ship-order', HanderBus);
    axiosServer.AxiosPost(val, '/ShipClient/GetShipNetwork').then(res => {//res = [],如果id存在[{}...]，id不存在[]
      if (res.length != 0) {
        equipmentNetwork.value = formInline.equipmentNetwork
        const countIsNetwork = res.filter(item => item.equipmentNetwork === "是").length;
        const isNetworkEquipmentIds = res
          .filter(item => item.equipmentNetwork === "是")
          .map(item => item.equipmentId);
        formInline.networdkEqNumber = countIsNetwork
        formInline.equipmentIds = isNetworkEquipmentIds
        console.log('222222')
        const resPop = res.pop()
        console.log('resPop',resPop)
        if (resPop.protectTime != undefined && resPop.protectTime != '') {
          console.log('111111111')
          formInline.protectTime = resPop.protectTime
          console.log('resPop.protectTime',resPop.protectTime)
          console.log('formInline.protectTime',formInline.protectTime)
        } else {
          formInline.protectTime = 0
        }
        const dateNow = dayjs(Date()).format("YYYY-MM-DD")
        const dateOrder = dayjs(orderDate).format("YYYY-MM-DD")
        const daysDifference = dayjs(dateNow).diff(dateOrder, 'day');
        const protectTimeRemaining = (formInline.protectTime * 365) - daysDifference
        const { years, months, days } = daysToYearsMonthsDays(protectTimeRemaining);
        time.value = years + '年' + months + '月' + days + '日'
      }
    })
  }
EventBus.on('slide-ship-order', HanderBus)
//EventBus.off('slide-ship-order', async (val: any) => {})
/**
 * 增
 */
const NetworkUpdate = () => {//提交
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  formInline.equipmentNetwork = equipmentNetwork.value
  console.log('联网', formInline)
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipNetwork').then(res => {
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
  return;
}
</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  