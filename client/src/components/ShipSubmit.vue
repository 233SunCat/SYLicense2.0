<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">发货信息</el-text>
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
            <el-form-item label="发货方">
              <el-row :gutter="5" style="width: 100%">
                <el-col :span="10">
                  <el-input style="width: 100%" v-model="formInline.emailName" placeholder="发货人姓名" clearable />
                </el-col>
                <el-col :span="13">
                  <el-input style="width: 100%" v-model="formInline.emailPhone" placeholder="发货人手机号" clearable />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="发货城市/机构">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-select v-model="formInline.emailCity" placeholder="发货城市" clearable>
                    <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="formInline.emailCompany" placeholder="发货机构" clearable>
                    <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="详细发货地址">
              <el-input style="width: 100%" v-model="formInline.emailCity_q" placeholder="输入发货地址" clearable />
            </el-form-item>
            <el-form-item label="发货日期">
              <el-date-picker style="width: 100%" v-model="formInline.emailDate" type="date" clearable />
            </el-form-item>
            <el-form-item label="物流费用/元">
              <el-input style="width: 100%" v-model="formInline.shippingCost" clearable placeholder="输入物流费用" />
            </el-form-item>
            <el-form-item label="物流费用支付方">
              <el-select style="width: 100%" v-model="formInline.paymentMethod" placeholder="输入物流费用支付方" clearable>
                <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                <el-option label="虚实结合腹腔镜" value="虚实结合腹腔镜" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认保存</el-button>
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
import axiosServer from '../assets/common/axios-server.js'
import qs from 'qs'; // 引入 qs 库

const labelPosition = ref<FormProps["labelPosition"]>("right");
var formInline = reactive({
  //这里就是获取的数据
  emailName: "",
  emailPhone: "",
  emailCity: "",
  emailCompany: "",
  emailCity_q: "",
  emailDate: null,
  shippingCost: "",
  paymentMethod: ""
});
const FormDisplay = (data) => {
    Object.keys(data).forEach((key) => {
    formInline[key] = data[key];
  });
}
var  orderDate  = null
var clientName = ''
const onSubmit = () => {
  if (
    formInline.emailName == "" ||
    formInline.emailPhone == "" ||
    formInline.emailCity == "" ||
    formInline.emailCompany == "" ||
    formInline.emailCity_q == "" ||
    formInline.shippingCost == "" ||
    formInline.paymentMethod == ""

  ) {
    ElMessageBox.alert("输入不能为空", "提示：", {
      confirmButtonText: "确认",
    });
    return;
  }
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipEmail')
};
const handerBus = async (val: any) => {
    orderDate = val.orderDate
    clientName = val.clientName
    //EventBus.off('slide-ship-order', handerBus)

    axiosServer.AxiosPost(val,'/ShipClient/GetShipEmail').then(res=>{
      FormDisplay(res.pop())
    })
}
EventBus.on('slide-ship-order', handerBus)
</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  