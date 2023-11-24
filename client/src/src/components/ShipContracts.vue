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
              <el-input style="width: 100%" v-model="formInline.dealer" placeholder="填写代理商信息" clearable />
            </el-form-item>
            <el-form-item label="合同签订日期">
              <el-date-picker style="width: 100%" v-model="formInline.contractSignDate" type="date" clearable />
            </el-form-item>
            <el-form-item label="合同金额/元">
              <el-input style="width: 100%" v-model="formInline.contractMoney" clearable placeholder="输入合同的金额" />
            </el-form-item>
            <el-form-item label="付款日期">
              <el-date-picker style="width: 100%" v-model="formInline.paymentDate" type="date" placeholder="请选择付款日期"
                clearable />
            </el-form-item>
            <el-form-item label="付款方式">
              <el-select style="width: 100%" v-model="formInline.paymentMethod" placeholder="请选择付款方式" clearable>
                <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                <el-option label="虚实结合腹腔镜" value="虚实结合腹腔镜" />
              </el-select>
            </el-form-item>
            <el-form-item label="中标价格/元">
              <el-input style="width: 100%" v-model="formInline.winning_bid_price" clearable placeholder="输入合同的金额" />
            </el-form-item>
            <el-form-item label="服务费/元">
              <el-input style="width: 100%" v-model="formInline.service_fee" clearable placeholder="输入合同的金额" />
            </el-form-item>
            <el-form-item label="开票情况">
              <el-select style="width: 100%" v-model="formInline.invoice_status" placeholder="请选择开票情况" clearable>
                <el-option label="已开票" value="已开票" />
                <el-option label="未开票" value="未开票" />
              </el-select>
            </el-form-item>
            <el-form-item label="开票日期">
              <el-date-picker style="width: 100%" v-model="formInline.invoice_date" type="date" placeholder="请选择开票日期"
                clearable />
            </el-form-item>
            <el-form-item label="开票编号">
              <el-input style="width: 100%" v-model="formInline.invoice_number" clearable placeholder="请输入开票编号" />
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

const labelPosition = ref<FormProps["labelPosition"]>("right");
const formInline = reactive({
  dealer: '', // 代理商信息  
  contractSignDate: Date(), // 合同签订日期  
  contractMoney: '', // 合同金额/元  
  paymentDate: Date(),
  paymentMethod: '', // 付款方式  
  winning_bid_price: '', // 中标价格/元  
  service_fee: '',//服务费
  invoice_status: '', // 开票情况  
  invoice_date: Date(), // 开票日期  
  invoice_number: '', // 开票编号  
});


const onSubmit = () => {
  //uploadRef.value!.submit()//发送文件服务端
  //uploadData.append('clientName', formInline.clientName);
  // axios.get('/users')
  //     .then(response => {
  //         console.log(response)
  //     })
  //     .catch(error => {
  //         console.error(error)
  //     })
  //除上传图片，其他为空，则弹框，不请求
  if (
    formInline.dealer == "" ||
    formInline.contractSignDate == null ||
    formInline.contractMoney == "" ||
    formInline.paymentDate == null ||
    formInline.paymentMethod == "" ||
    formInline.winning_bid_price == "" ||
    formInline.service_fee == "" ||
    formInline.invoice_status == "" ||
    formInline.invoice_date == null ||
    formInline.invoice_number == ""

  ) {
    ElMessageBox.alert("输入不能为空", "提示：", {
      confirmButtonText: "确认",
    });
    return;
  }
  console.log(formInline)
};
</script>
    
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
    