<template>
  <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
      <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
          style="max-width: 460px;width: 40%;">
            <el-form-item label="微信ID">
                  <el-input style="width: 100%" v-model="formInline.wxID" placeholder="微信ID" clearable />        
            </el-form-item>
          <el-form-item label="微信昵称">
              <el-input    style="width: 100%;" v-model="formInline.nickName" placeholder="微信昵称" clearable />
          </el-form-item>
          <el-form-item label="用户姓名">
              <el-input style="width: 100%;" v-model="formInline.realName" placeholder="用户姓名" clearable />
         </el-form-item>
        <el-form-item label="账号状态">
                  <el-select v-model="formInline.applyStatus" placeholder="账号状态" clearable>
                    <el-option label="启用" value="启用" />
                    <el-option label="禁用" value="禁用" />
                  </el-select>         
        </el-form-item>
        <el-form-item label="模块选择：">
                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                  :disabled="netDisabled">全选</el-checkbox>
                <el-checkbox-group v-model="formInline.equipmentModule" @change="handleCheckedCitiesChange"
                  :disabled="netDisabled">
                  <el-checkbox v-for="item in cities" :key="item" :label="item">{{
                    item
                  }}</el-checkbox>
                </el-checkbox-group>
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

//数据
const formInline = reactive({//这里就是获取的数据
    nickName : '',
    realName : '',
    wxID : '',
    applyStatus:'' 
})
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref([])
const cities = ['镜头训练', '分离训练', 'FLS技能训练', '剪切训练', '钛夹训练', '电凝训练', '双手合作训练', '抓取训练']


const onCancel = () => {
  console.log('取消')
}
//通信区域
//接受请求

//发送请求

var  orderDate  = null
var clientName = ''
var props = defineProps(['message'])

const DataInit = () => {
    nickName = props.message.nickName
    realName = props.message.realName
    wxID = props.message.wxID
    applyStatus = props.message.applyStatus
}
const onSubmit = () => {//提交


    if (
    formInline.eventDescription == "" ||
    formInline.eventDate == null ||
    formInline.eventUsedMoney == "" 
  ) {
    ElMessageBox.alert("输入不能为空", "提示：", {
      confirmButtonText: "确认",
    });
    return;
  }
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  console.log('增加事件',formInline)
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipEvent')
}


</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
