<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">设备联网及质保</el-text>
      </el-header>
      <el-main style="background-color: #ffffff;">
      <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
        <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
          style="max-width: 460px;width: 40%;">
          <el-form-item label="是否联网">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                city
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="联网设备台数">
            <el-select style="width: 100%;" v-model="formInline.networdkEqNumber" placeholder="选择设备数量" clearable>
              <el-option v-for="item in items" :key="item" :label="item" :value="item" />
            </el-select> </el-form-item>
          <el-form-item label="联网设备编号">
            <el-row :gutter="5" style="width: 100%">
              <el-col :span="8">
                <el-input style="width: 100%" v-model="formInline.networkOne" clearable />
              </el-col>
              <el-col :span="8">
                <el-input style="width: 100%" v-model="formInline.networkTwo" clearable />
              </el-col>
              <el-col :span="8">
                <el-input style="width: 100%" v-model="formInline.networkThree" clearable />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="质保期">
            <el-row :gutter="5" style="width: 100%">
              <el-col :span="8">
                <el-input type="number" min="0" style="width: 100%;" v-model="formInline.protectTime" placeholder="请输入数字"
                  clearable @input="PeriodInput" />
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
            <el-button type="primary" @click="onSubmit">确认</el-button>
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
import axios from "axios";
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import { fi } from 'element-plus/es/locale';
//数据
const time = ref('')
const labelPosition = ref<FormProps['labelPosition']>('right')
const formInline = reactive({//这里就是获取的数据
  networdkEqNumber: 5,
  networkOne: '',
  networkTwo: '',
  networkThree: '',
  protectTime: ''
})
const checkAll = ref(false)
const isIndeterminate = ref(true)
var checkedCities = ref(['是'])
var cities = ['是', '否']
var items = ref([1, 2, 3, 4, 5, 6]);
var status = 1;
//事件
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
const change = () => {//判断是否在库
  if (checkedCities.value.length == 0 || checkedCities.value.length == 2) {
    status = 0;
    ElMessageBox.alert('错误操作|只能单选', '提示：', {
      confirmButtonText: '确认',
    })
    return;
  }
}

const datePack = () => {//打包数据
  formInline.checkStatus = checkedCities.value[0];
}
const statusPack = () => {//状态函数
  change();
  datePack();
}
/**
 * 计算两个日期之间的天数
 * @param dateString1  开始日期 yyyy-MM-dd
 * @param dateString2  结束日期 yyyy-MM-dd
 * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
 */
function getDaysBetween(dateString1, dateString2) {
  var startDate = Date.parse(dateString1);
  var endDate = Date.parse(dateString2);
  if (startDate > endDate) {
    return 0;
  }
  if (startDate == endDate) {
    return 1;
  }
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  return days;
}
function convertDaysToYearsMonthsDays(totalDays: number): { years: number, months: number, days: number } {
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = (remainingDaysAfterYears % 30) || 30; // 如果剩余天数小于30，那么就是剩余的天数，否则就是30天  

  return { years, months, days };
}

const QgPeriod = (qgPeriod: any, start: any, end: any) => {//质保剩余时间计算
  const time = 360 * qgPeriod
  const days = Math.ceil(time - getDaysBetween(start, start))
  if (days > 0) {
    const date = convertDaysToYearsMonthsDays(days)
    const dayTimeString = date.years + '年' + date.months + '月' + date.days + '天'
    return dayTimeString
  }
  return '已过期'
}
const PeriodInput = () => {
  //const dayTime =  dayjs(formInline.value.arrivalTime).format("YYYY-MM-DD")
  const start = GetEqStart()
  const end = dayjs(Date()).format("YYYY-MM-DD")
  time.value = QgPeriod(formInline.protectTime, start, end)
}
//通信区域
//接受请求

//发送请求
const GetEqStart = () => {//获得机器在库开始时间
  return '2023-8-8'
}

const onSubmit = () => {//提交
  status = 1;
  statusPack()
  if (status == 0) {
    return;
  }
  console.log('数据格式：', formInline)
  return;
}
</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  