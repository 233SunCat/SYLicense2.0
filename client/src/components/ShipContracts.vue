<template>
  <div class="common-layout">
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
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-upload v-model:file-list="fileList" class="upload-demo"
                  action="http://localhost:3000/shipContracts/upload" 
                  :data="uploadData"
                  :limit="3"
                  multiple
                  :on-change="handleChange" 
                  :before-upload="beforeUpload">
                        <el-link type="primary">上传相关附件</el-link>
                </el-upload>
              </el-col>
                <el-col :span="12">
                  <el-link type="primary" plain @click="DownloadExe">下载相关附件</el-link>
                </el-col>
              </el-row>
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
import { dayjs, FormProps } from "element-plus";
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus';
import axios from 'axios';

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
const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])
var uploadData;
EventBus.on('slide-ship-order', async (val: any) => {
    orderDate = val.orderDate
    clientName = val.clientName
    uploadData = {orderDate:dayjs(orderDate).format("YYYY-MM-DD-HH-MM-SS") ,clientName:clientName}
    axiosServer.AxiosPost(val,'/ShipClient/GetShipContracts').then(res=>{
      Object.assign(formInline, funBox.FormDisplay(res,formInline,formInlineCopy));
    })
})
/**
 * 上传文件
 */
const handleChange = async (file, fileList) => {
  //fileList.value = fileList.value.slice(-3)
  // 处理上传结果
  if (file.status === 'success') {
    // 显示上传成功的提示
    ElMessage.success('文件 上传成功!');
  } else if (file.status === 'error') {
    // 显示上传失败的提示
    ElMessage.error('文件 上传失败，请重试或联系管理员!');
  }
};
const  beforeUpload = (file) => {
      // 在这里可以配置额外的参数
      const additionalParams = {
        orderDate: orderDate,
        clientName: clientName,
      };

      // 将额外参数添加到 FormData 中
      const formData = new FormData();
      Object.keys(additionalParams).forEach((key) => {
        formData.append(key, additionalParams[key]);
      });

      // 将 FormData 赋值给 file 对象的 request 属性
      file.request = {
        headers: {}, // 可以添加其他请求头配置
        data: additionalParams,
      };

      return true; // 返回 true 表示继续上传，返回 false 则取消上传
}
/**
 * 下载工具
 */
 const DownloadExe = async () => {
//
}
</script>
    
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
    