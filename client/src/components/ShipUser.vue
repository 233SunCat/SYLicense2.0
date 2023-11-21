<template>
  <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
      <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
          style="max-width: 460px;width: 40%;">
          <el-form-item label="用户名称">
              <el-input style="width: 100%;" v-model="formInline.usedName" placeholder="请填写终端用户全称" clearable />
          </el-form-item>
          <el-form-item label="订单状态">
              <el-select style="width: 100%;" v-model="formInline.orderStatus" placeholder="订单状态" clearable>
                  <el-option v-for="item in items" :key="item" :label="item" :value="item" />
              </el-select> </el-form-item>
              <el-form-item label="中标时间">
              <el-date-picker style="width: 100%;" v-model="formInline.hitDate" type="date" placeholder="请选择中标时间"
                  clearable />          
              </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
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

//数据
const formInline = reactive({//这里就是获取的数据
  usedName: '',
  orderStatus: '',
  hitDate: '',
})
var checkedCities = ref(['是'])
var cities = ['是', '否']
var items = ref(['已中标','未中标']);
var status = 1;
//事件



//通信区域
//接受请求

//发送请求




const onSubmit = () => {//提交
  console.log('输出',formInline)
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
