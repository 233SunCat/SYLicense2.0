<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">合同信息</el-text>
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
            style="max-width: 590px; width: 80%;">
            <el-form-item label="代理商信息">
              <el-input style="width: 100%" v-model="formInline.dealer" placeholder="填写代理商信息" clearable :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="合同签订日期">
              <el-date-picker style="width: 100%" v-model="formInline.contractSignDate" type="date" clearable :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="合同金额/元">
              <el-input style="width: 100%" v-model="formInline.contractMoney" clearable placeholder="输入合同的金额" :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="付款日期">
              <el-date-picker style="width: 100%" v-model="formInline.paymentDate" type="date" placeholder="请选择付款日期"
                clearable :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="付款方式">
              <el-select style="width: 100%" v-model="formInline.paymentMethod" placeholder="请选择付款方式" clearable :disabled="disabled">
                <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                <el-option label="虚实结合腹腔镜" value="虚实结合腹腔镜" />
              </el-select>
            </el-form-item>
            <el-form-item label="中标价格/元">
              <el-input style="width: 100%" v-model="formInline.winningBidPrice" clearable placeholder="输入合同的金额" :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="服务费/元">
              <el-input style="width: 100%" v-model="formInline.serviceFee" clearable placeholder="输入合同的金额" :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="开票情况">
              <el-select style="width: 100%" v-model="formInline.invoiceStatus" placeholder="请选择开票情况" clearable :disabled="disabled">
                <el-option label="已开票" value="已开票" />
                <el-option label="未开票" value="未开票" />
              </el-select>
            </el-form-item>
            <el-form-item label="开票日期">
              <el-date-picker style="width: 100%" v-model="formInline.invoiceDate" type="date" placeholder="请选择开票日期"
                clearable :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="开票编号">
              <el-input style="width: 100%" v-model="formInline.invoiceNumber" clearable placeholder="请输入开票编号" :disabled="disabled"/>
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
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import type { UploadInstance } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'

const labelPosition = ref<FormProps["labelPosition"]>("right");
  //const disabled = ref(true)
  var orderDate  = null
var clientName = ''
const formInline = reactive({
  dealer: '', // 代理商信息  
  contractSignDate: null, // 合同签订日期  
  contractMoney: '', // 合同金额/元  
  paymentDate: null,
  paymentMethod: '', // 付款方式  
  winningBidPrice: '', // 中标价格/元  
  serviceFee: '',//服务费
  invoiceStatus: '', // 开票情况  
  invoiceDate: null, // 开票日期  
  invoiceNumber: '', // 开票编号  
});


const formInlineCopy = formInline
const FormDisplay = (data) => {
  if (data.length != 0) {
    data = data.pop()
    if (data.emailName == '') {
      //disabled.value = false
    } else {
      //disabled.value = true
    }
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
  const formInlineFields = Object.keys(formInline);  
  if(funBox.checkRequiredFields(formInline, formInlineFields)){return}
  
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipContracts').then(res => {
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
    axiosServer.AxiosPost(val,'/ShipClient/GetShipContracts').then(res=>{
      FormDisplay(res)
    })
})
</script>
    
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
    