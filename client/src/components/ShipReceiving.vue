<template>
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-header
        style="background-color: #f6f8f8; display: flex; align-items: center"
      >
        <el-text class="mx-1" size="large">收货信息</el-text>
      </el-header>
      <el-main style="background-color: #ffffff">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
          "
        >
          <el-form
            class="demo-form-inline"
            :label-position="labelPosition"
            label-width="120px"
            style="max-width: 590px; width: 80%"
          >
            <el-form-item label="收货方">
              <el-row :gutter="5" style="width: 100%">
                <el-col :span="10">
                  <el-input
                    style="width: 100%"
                    v-model="formInline.ReceivingName"
                    placeholder="收货人姓名"
                    clearable
                  />
                </el-col>
                <el-col :span="13">
                  <el-input
                    style="width: 100%"
                    v-model="formInline.ReceivingPhone"
                    placeholder="收货人手机号"
                    clearable
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="收货城市/机构">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-select
                    v-model="formInline.ReceivingCity"
                    placeholder="发货城市"
                    clearable
                  >
                    <el-option-group label="东北">
                      <el-option label="黑龙江省" value="黑龙江省" />
                      <el-option label="吉林省" value="吉林省" />
                      <el-option label="辽宁省" value="辽宁省" />
                    </el-option-group>
                    <el-option-group label="华东">
                      <el-option label="上海市" value="上海市" />
                      <el-option label="江苏省" value="江苏省" />
                      <el-option label="浙江省" value="浙江省" />
                      <el-option label="安徽省" value="安徽省" />
                      <el-option label="福建省" value="福建省" />
                      <el-option label="江西省" value="江西省" />
                      <el-option label="山东省" value="山东省" />
                      <el-option label="台湾省" value="台湾省" />
                    </el-option-group>
                    <el-option-group label="华北">
                      <el-option label="北京市" value="北京市" />
                      <el-option label="天津市" value="天津市" />
                      <el-option label="山西省" value="山西省" />
                      <el-option label="河北省" value="河北省" />
                      <el-option label="内蒙古自治区" value="内蒙古自治区" />
                    </el-option-group>
                    <el-option-group label="华中">
                      <el-option label="河南省" value="河南省" />
                      <el-option label="湖北省" value="湖北省" />
                      <el-option label="湖南省" value="湖南省" />
                    </el-option-group>
                    <el-option-group label="华南">
                      <el-option label="广东省" value="广东省" />
                      <el-option
                        label="广西壮族自治区"
                        value="广西壮族自治区"
                      />
                      <el-option label="海南省" value="海南省" />
                      <el-option
                        label="香港特别行政区"
                        value="香港特别行政区"
                      />
                      <el-option
                        label="澳门特别行政区"
                        value="澳门特别行政区"
                      />
                    </el-option-group>
                    <el-option-group label="西南">
                      <el-option label="四川省" value="四川省" />
                      <el-option label="贵州省" value="贵州省" />
                      <el-option label="云南省" value="云南省" />
                      <el-option label="重庆市" value="重庆市" />
                      <el-option label="西藏自治区" value="西藏自治区" />
                    </el-option-group>
                    <el-option-group label="西北">
                      <el-option label="陕西省" value="陕西省" />
                      <el-option label="甘肃省" value="甘肃省" />
                      <el-option label="青海省" value="青海省" />
                      <el-option
                        label="宁夏回族自治区"
                        value="宁夏回族自治区"
                      />
                      <el-option
                        label="新疆维吾尔自治区"
                        value="新疆维吾尔自治区"
                      />
                    </el-option-group>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="formInline.ReceivingCompany"
                    placeholder="发货机构"
                    clearable
                  >
                    <el-option label="顺丰" value="顺丰" />
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="详细收货地址">
              <el-input
                style="width: 100%"
                v-model="formInline.ReceivingLocation"
                placeholder="输入收货地址"
                clearable
              />
            </el-form-item>
            <el-form-item label="期望收货日期">
              <el-date-picker
                style="width: 100%"
                v-model="formInline.ReceivingDate"
                type="date"
                clearable
              />
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
import type { FormProps } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import type { UploadInstance } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";
import axiosServer from '../assets/common/axios-server.js'
import qs from 'qs'; // 引入 qs 库
const labelPosition = ref<FormProps["labelPosition"]>("right");
const formInline = reactive({
  //这里就是获取的数据
  ReceivingName: "",
  ReceivingPhone: "",
  ReceivingCity: "",
  ReceivingCompany: "",
  ReceivingLocation: "",
  ReceivingDate: Date(),
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
    formInline.ReceivingName == "" ||
    formInline.ReceivingPhone == "" ||
    formInline.ReceivingCity == "" ||
    formInline.ReceivingCompany == "" ||
    formInline.ReceivingLocation == ""
  ) {
    ElMessageBox.alert("输入不能为空", "提示：", {
      confirmButtonText: "确认",
    });
    return;
  }
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipReceiving')

};
</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  