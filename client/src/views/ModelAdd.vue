<template>
  <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
    <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
      style="max-width: 460px;width: 40%;">
      <el-form-item label="设备名称">
        <el-select style="width: 100%;" v-model="formInline.modelName" placeholder="设备名称" clearable
          @change="handleSelectClick(formInline.modelName)">
          <el-option v-for="item, key in models" :key="key" :label="item" :value="item" />
        </el-select> </el-form-item>
      <el-form-item label="设备型号">
        <el-input style="width: 100%;" v-model="formInline.modelStyle" placeholder="设备型号" disabled clearable />
      </el-form-item>
      <el-form-item label="生产日期">
        <el-date-picker style="width: 100%;" v-model="formInline.produceDate" type="date" placeholder="选择生产日期"
          clearable />
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input style="width: 100%;" v-model="formInline.modelId" placeholder="输入设备编号" clearable />
      </el-form-item>

      <el-form-item label="软件版本">
        <el-input style="width: 100%;" v-model="formInline.softwareVersion" placeholder="输入软件版本" clearable />
      </el-form-item>
      <el-form-item label="是否在库">
        <el-radio-group v-model="formInline.inventoryStatus" class="ml-4">
          <el-radio label="是" size="large">是</el-radio>
          <el-radio label="否" size="large">否</el-radio>
        </el-radio-group>
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
import type { FormProps } from 'element-plus'
import messageBox from '../assets/common/message-box'
import * as constants from '../constants.json';
import funBox from '../assets/common/fun-box'
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库

//数据
const labelPosition = ref<FormProps['labelPosition']>('right')
const formInline = reactive({//这里就是获取的数据
  modelName: constants.selectEquipmentName,
  modelId: '',
  produceDate: '',
  softwareVersion: '',
  modelStyle: '',
  inventoryStatus: '是',
  modelModule: constants.Module
})
var models = ref(constants.selectEquipmentName);
const InputClear = () => {
  formInline.modelId = ''
  formInline.produceDate = Date()
  formInline.softwareVersion = ''
  formInline.inventoryStatus = '是'
}

const handleSelectClick = (val: any) => {//选中下拉框
  formInline.modelStyle = constants.modelNameStyle[val]
}
const onSubmit = () => {//提交
  const formInlineFields = Object.keys(formInline);
  if (funBox.checkRequiredFields(formInline, formInlineFields)) { return }
  axiosServer.AxiosPost(qs.stringify(formInline), '/Model/ModelAdd').then(res => {
    console.log('请求结果', res)
    if (res.success == true) {
      InputClear()
      messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
  return;
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
