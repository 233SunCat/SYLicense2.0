<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">签收信息</el-text>
      </el-header>
      <el-main style="background-color: #ffffff;">
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        ">
          <el-form class="demo-form-inline" :label-position="labelPosition" label-width="120px"
            style="max-width: 590px; width: 80%">
            <el-form-item label="签收方">
              <el-row :gutter="5" style="width: 100%">
                <el-col :span="10">
                  <el-input style="width: 100%" v-model="formInline.signforName" placeholder="签收人姓名" clearable  :disabled="disabled"/>
                </el-col>
                <el-col :span="13">
                  <el-input style="width: 100%" v-model="formInline.signforPhone" placeholder="签收人手机号" clearable  :disabled="disabled"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="签收日期">
              <el-date-picker style="width: 100%" v-model="formInline.signforDate" type="date" clearable  :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="是否在库">
              <el-checkbox-group v-model="inventoryStatus" @change="handleinventoryStatusChange"  :disabled="disabled">
                <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="disabled">确认保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from "vue";
import axios from "axios";
import type { FormProps } from "element-plus";
import { ElMessageBox } from "element-plus";
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'

//const disabled = ref(true)

const labelPosition = ref<FormProps["labelPosition"]>("right");
var orderDate  = null
var clientName = ''
const formInline = reactive({
  //这里就是获取的数据
  signforName: "",
  signforPhone: "",
  signforDate: null,

});
var inventoryStatus = ref(['是'])
var cities = ['是', '否']
var status = 1;


const change = () => {//判断是否在库
  if (inventoryStatus.value.length == 0 || inventoryStatus.value.length == 2) {
    status = 0;
    messageBox.MessageBox("错误只能单选")
    return;
  }
}

const formInlineCopy = formInline
const FormDisplay = (data) => {
  if (data.length != 0) {
    data = data.pop()
    if (data.emailName == '') {
      //disabled.value = false
    } else {
      //disabled.value = true
    }
    inventoryStatus.value = [data.inventoryStatus]
    Object.keys(data).forEach((key) => {
      formInline[key] = data[key];
    });
  } else {
    //disabled.value = false
    formInline = formInlineCopy
  }
}
var  orderDate  = null
var clientName = ''
const onSubmit = () => {
  status = 1;
  change();
  if (status == 0) {
    return;
  } else {
    formInline.inventoryStatus = inventoryStatus.value[0];
  }
  const formInlineFields = Object.keys(formInline);  
  if(funBox.checkRequiredFields(formInline, formInlineFields)){return}
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddSignfor').then(res => {
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
};
EventBus.on('slide-ship-order', async (val: any) => {
    orderDate = val.orderDate
    clientName = val.clientName
    axiosServer.AxiosPost(val,'/ShipClient/GetSignfor').then(res=>{
      FormDisplay(res)
    })
})
</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  