<template>
    <div class="common-layout" style="height: 50%;">
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
                                    <el-input style="width: 100%" v-model="formInline.signforName" placeholder="签收人姓名"
                                        clearable :disabled="disabled" />
                                </el-col>
                                <el-col :span="13">
                                    <el-input style="width: 100%" v-model="formInline.signforPhone" placeholder="签收人手机号"
                                        clearable :disabled="disabled" />
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="签收日期">
                            <el-date-picker style="width: 100%" v-model="formInline.signforDate" type="date" clearable
                                :disabled="disabled" />
                        </el-form-item>
                        <el-form-item label="是否返回仓库">
                            <el-radio-group v-model="formInline.inventoryStatus" class="ml-4">
                                <el-radio label="是" size="large">是</el-radio>
                                <el-radio label="否" size="large">否</el-radio>
                            </el-radio-group>
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
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'
import { useRouter, useRoute } from 'vue-router';

//const disabled = ref(true)
const route = useRoute();
const labelPosition = ref<FormProps["labelPosition"]>("right");
const applyDateApply = route.query.applyDateApply
const applyNameApply = route.query.applyNameApply
const formInline = reactive({
    //这里就是获取的数据
    signforName: "",
    signforPhone: "",
    signforDate: null,
    inventoryStatus: '是',

});

const formInlineCopy = formInline

const onSubmit = () => {
    const formInlineFields = Object.keys(formInline);
    if (funBox.checkRequiredFields(formInline, formInlineFields)) { return }
    formInline.applyDateApply = applyDateApply
    formInline.applyNameApply = applyNameApply
    axiosServer.AxiosPost(qs.stringify(formInline), '/Model/AddMTapplySignfor').then(res => {
        if (res.success == true) {
            messageBox.MessageBox('保存成功')
        } else {
            messageBox.MessageBox('保存失败')
        }
    })
};
const dataInit = () => {
    var val = { applyDateApply: formInline.applyDateApply, applyNameApply: formInline.applyNameApply }
    axiosServer.AxiosPost(val, '/Model/GetMTapplySignfor').then(res => {//res = [],如果id存在[{}...]，id不存在[]
        console.log('res', res)
        Object.assign(formInline, funBox.FormDisplay(res, formInline, formInlineCopy));
    })
}
dataInit()
</script>
    
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>
    