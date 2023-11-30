<template>
    <div class="common-layout" style="height: 50%;">
        <el-container style="height: 100%;">
            <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
                <el-text class="mx-1" size="large">用户信息</el-text>
            </el-header>
            <el-main style="background-color: #ffffff;">
                <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
                    <el-form class="demo-form-inline" :label-position="labelPosition" label-width="120px"
                        style="max-width: 460px;width: 60%;">
                        <el-form-item label="样机申请方：">
                            <el-input style="width: 100%;" v-model="formInline.applyNameApply"
                                clearable disabled/>
                        </el-form-item>
                        <el-form-item label="样机使用用户：">
                            <el-input style="width: 100%;" v-model="formInline.usedNameApply"
                                clearable disabled/>
                        </el-form-item>
                        <el-form-item label="样机用途：">
                            <el-input style="width: 100%;" v-model="formInline.usedFunctionApply"
                                clearable disabled/>
                        </el-form-item>
                        <el-form-item label="选择设备名称：">
                            <el-input style="width: 100%;" v-model="formInline.modelNameApply"
                                clearable disabled/>
                        </el-form-item>
                        <el-form-item label="模块信息：">
                            <el-row :gutter="30">
                                <el-col :span="8" v-for="item in formInline.modelModuleApply" :key="item">
                                    <el-button type="info" disabled>{{ item }}</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="期望到货时间">
                            <el-date-picker v-model="formInline.arrivalDateApply" type="datetime"
                                :default-time="defaultTime" disabled/>
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
import { useRouter, useRoute } from 'vue-router';
import axiosServer from '../assets/common/axios-server'
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'
import qs from 'qs'; // 引入 qs 库
const route = useRoute();

//数据
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const labelPosition = ref<FormProps['labelPosition']>('right')
var module = constants.Module
var equipmentFunctions = constants.selectModelFunctions
var equipmentNames = constants.selectModelName
const checkAll = ref(false)

const getDefaultFormInline = () => {
    return {
        applyNameApply: route.query.applyNameApply,
        usedNameApply: route.query.usedNameApply,
        usedFunctionApply: route.query.usedFunctionApply,
        modelNameApply: route.query.modelNameApply,
        arrivalDateApply: route.query.arrivalDateApply,
        modelModuleApply: route.query.modelModuleApply,
    };
};
const formInline = reactive(getDefaultFormInline())

const isIndeterminate = ref(true)


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
}</style>
  