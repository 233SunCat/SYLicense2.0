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
                  <el-input style="width: 100%" v-model="formInline.shipName" placeholder="签收人姓名" clearable />
                </el-col>
                <el-col :span="13">
                  <el-input style="width: 100%" v-model="formInline.shipPhone" placeholder="签收人手机号" clearable />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="签收日期">
              <el-date-picker style="width: 100%" v-model="formInline.shipDate" type="date" clearable />
            </el-form-item>
            <el-form-item label="是否在库">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
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
  shipDate: Date(),

});
var checkedCities = ref(['是'])
var cities = ['是', '否']
var status = 1;


const change = () => {//判断是否在库
  if (checkedCities.value.length == 0 || checkedCities.value.length == 2) {
    status = 0;
    ElMessageBox.alert('错误操作|只能单选', '提示：', {
      confirmButtonText: '确认',
    })
    return;
  }
}
const onSubmit = () => {
  status = 1;
  change();
  if (status == 0) {
    return;
  } else {
    formInline.checkStatus = checkedCities.value[0];
  }
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
    formInline.shipPhone == ""
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
  