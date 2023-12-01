<template>
    <div class="common-layout" style="height: 70%;">
        <el-container style="height: 100%;">
            <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
                <el-text class="mx-1" size="large">用户信息</el-text>
            </el-header>
            <el-main style="background-color: #ffffff;">
                <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
                    <el-form class="demo-form-inline" :label-position="labelPosition" label-width="120px"
                        style="max-width: 460px;width: 60%;">
                        <el-form-item label="样机申请方：">
                            <el-input style="width: 100%;" v-model="formInline.applyNameApply" placeholder="样机申请方" clearable />
                        </el-form-item>
                        <el-form-item label="样机使用用户：">
                            <el-input style="width: 100%;" v-model="formInline.usedNameApply" placeholder="样机使用用户" clearable />
                        </el-form-item>
                        <el-form-item label="样机用途：">
                            <el-select style="width: 100%;" v-model="formInline.usedFunctionApply" placeholder="样机用途"
                                clearable>
                                <el-option v-for="Function in equipmentFunctions" :key="Function" :label="Function"
                                    :value="Function" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="期望到货时间">
                            <el-date-picker v-model="formInline.arrivalDateApply" type="datetime" placeholder="选择期望到货时间"
                                :default-time="defaultTime" />
                        </el-form-item>
                        <el-form-item label="期望到货地址">
                            <el-input style="width: 100%;" v-model="formInline.arrivalLocationApply" placeholder="期望到货地址"
                                clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="eamilSubmit">确认保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormProps } from 'element-plus'
import * as constants from '../constants.json';
import axiosServer from '../assets/common/axios-server'
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'
import qs from 'qs'; // 引入 qs 库
import dayjs from 'dayjs'
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const modelIdAllocation = route.query.modelId
const modelNameAllocation = route.query.modelName
const modelInventoryStatusAllocation = '在库'
const modelModuleAllocation = route.query.modelModule
//数据
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const labelPosition = ref<FormProps['labelPosition']>('right')
var module = constants.Module
var equipmentFunctions = constants.selectModelFunctions
var equipmentNames = constants.selectModelName
const checkAll = ref(false)

const getDefaultFormInline = () => {
  return {
    applyNameApply: '',
    usedNameApply: '',
    usedFunctionApply: '',
    //modelNameApply: '',
    arrivalDateApply: new Date(),
    arrivalLocationApply: '',
    //modelModuleApply: module.length !== 0 ? module.slice(0, 2) : [],
    applyDateApply: dayjs(Date()).format("YYYY-MM-DD hh:mm:ss"),
    applyStatusApply: '待审核'
  };
};
const formInline = reactive(getDefaultFormInline())

const isIndeterminate = ref(true)

//事件
const handleCheckAllChange = (val: boolean) => {
    formInline.modelModuleApply = val ? module : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === module.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < module.length
}
const eamilSubmit = () => {//发送请求
    console.log('formInline',formInline)
    const formInlineFields = Object.keys(formInline);  
    if(funBox.checkRequiredFields(formInline, formInlineFields)){return}
    formInline.modelIdAllocation = modelIdAllocation
    formInline.modelNameAllocation = modelNameAllocation
    formInline.modelInventoryStatusAllocation = modelInventoryStatusAllocation
    formInline.modelModuleAllocation = modelModuleAllocation
    axiosServer.AxiosPost(qs.stringify(formInline), '/Model/ModelApply').then(res => {
    if (res.success == true) {
        Object.assign(formInline, getDefaultFormInline());
        messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
}
</script>
  
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
  