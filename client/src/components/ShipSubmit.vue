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
                  <el-input style="width: 100%" v-model="formInline.shipName" placeholder="发货人姓名" clearable />
                </el-col>
                <el-col :span="13">
                  <el-input style="width: 100%" v-model="formInline.shipPhone" placeholder="发货人手机号" clearable />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="发货城市/机构">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-select v-model="formInline.shipCity" placeholder="发货城市" clearable>
                    <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="formInline.shipCompany" placeholder="发货机构" clearable>
                    <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="详细发货地址">
              <el-input style="width: 100%" v-model="formInline.shipLocation" placeholder="输入发货地址" clearable />
            </el-form-item>
            <el-form-item label="发货日期">
              <el-date-picker style="width: 100%" v-model="formInline.shipDate" type="date" clearable />
            </el-form-item>
            <el-form-item label="物流费用/元">
              <el-input style="width: 100%" v-model="formInline.shipMoney" clearable placeholder="输入物流费用" />
            </el-form-item>
            <el-form-item label="物流费用支付方">
              <el-select style="width: 100%" v-model="formInline.shipPayer" placeholder="输入物流费用支付方" clearable>
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

const labelPosition = ref<FormProps["labelPosition"]>("right");
const formInline = reactive({
  //这里就是获取的数据
  shipName: "",
  shipPhone: "",
  shipCity: "",
  shipCompany: "",
  shipLocation: "",
  shipDate: Date(),
  shipMoney: "",
  shipPayer: ""
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
    formInline.shipName == "" ||
    formInline.shipPhone == "" ||
    formInline.shipCity == "" ||
    formInline.shipCompany == "" ||
    formInline.shipLocation == "" ||
    formInline.shipMoney == "" ||
    formInline.shipPayer == ""

  ) {
    ElMessageBox.alert("输入不能为空", "提示：", {
      confirmButtonText: "确认",
    });
    return;
  }
};
</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  