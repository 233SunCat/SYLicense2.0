<template>
  <div class="common-layout" style="height: 70%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">样机信息</el-text>
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
            style="max-width: 460px; width: 40%">
            <el-form-item label="选择发货样机">
              <el-select style="width: 100%;" v-model="modelModule" placeholder="设备名称" clearable @focus="GetModename"
                @change="handleSelectClick(modelModule.modelModule, formInline.modelModuleApply)">
                <el-option v-for="item, index in modelMessage" :key="index" :label="'样机 ' + item.modelName
                  + ' ' + item.modelId
                  + ' ' + item.inventoryStatus" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="模块信息：">
              <el-row :gutter="32">
                <el-col :span="8" v-for="item, key in modelModule.modelModule" :key="key">
                  <el-button type="info" @click="onButton(item)" disabled>{{
                    item
                  }}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-text class="mx-1" type="danger">{{ modulePe }}</el-text>
            </el-form-item>
            <el-form-item>
              <el-text class="mx-1" type="danger">多余模块：{{ moduleAdd }}</el-text>
            </el-form-item>
            <el-form-item>
              <el-text class="mx-1" type="danger">不足模块：{{ moduleMinus }}</el-text>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">配置训练模块</el-button>
              <el-dialog v-model="dialogFormVisible" title="维修记录">
                <ConfigureTrainingApply />
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitModel">保存模块</el-button>
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
import type { Action } from "element-plus";
import { useRouter, useRoute } from 'vue-router';
import ConfigureTrainingApply from './ConfigureTrainingApply.vue'
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import EventBus from "../assets/common/event-bus"
import messageBox from '../assets/common/message-box'
import * as constants from '../constants.json';
import funBox from '../assets/common/fun-box'
const labelPosition = ref<FormProps['labelPosition']>('right')

const route = useRoute();

const moduleAdd = ref([""]);
const moduleMinus = ref([""]);
var dialogFormVisible = ref(false)
const modelModule = ref('')
const modulePe = ref("");
const text = ref([]);
const modelMessage = ref([])

const applyNameApply = route.query.applyNameApply
const applyDateApply = route.query.applyDateApply

const getDefaultFormInline = () => {
  return {
    modelNameApply: route.query.modelNameApply,
    modelModuleApply: route.query.modelModuleApply,
  };
};
const formInline = reactive(getDefaultFormInline())

const modelNameId = ref('')

const GetModel = () => {
  //获得样机列表，在库，流转
  const data = { modelName: formInline.modelNameApply }
  axiosServer.AxiosPost(qs.stringify(data), '/Model/ModelByModelName').then(res => {
    //
    console.log('res获得样机', res)
    res = res.map(item => {
      if (item.inventoryStatus == '否') {
        item.inventoryStatus = '流转'
      }
      if (item.inventoryStatus == '是') {
        item.inventoryStatus = '在库'
      }
      return item
    });
    modelMessage.value = res
    console.log('modelMessage.value', modelMessage.value)

  })
};
GetModel()


function compareArrays(a: string[], b: string[]): { missing: string[], extra: string[] } {
  const missing: string[] = a.filter(item => !b.includes(item));
  const extra: string[] = b.filter(item => !a.includes(item));

  return { missing, extra };
}
const handleSelectClick = (modelModule, modelModuleApply) => {
  const comparisonResult = compareArrays(modelModuleApply, modelModule)
  console.log('样机模块', modelModule)
  console.log('申请模块', modelModuleApply)
  console.log('Missing in 样机:', comparisonResult.missing);
  console.log('Extra in 样机:', comparisonResult.extra);
  moduleAdd.value = comparisonResult.extra
  moduleMinus.value = comparisonResult.missing
};
const onSubmit = () => {
  dialogFormVisible.value = true;
}
const onSubmitModel = () => {
  console.log('modelModule', modelModule.value)
  const data = reactive({
    applyNameApply: applyNameApply,
    applyDateApply: applyDateApply,
    modelIdAllocation: modelModule.value.modelId,
    modelModuleAllocation: modelModule.value.modelModule,
    modelNameAllocation: modelModule.value.modelName,
    modelInventoryStatusAllocation: modelModule.value.inventoryStatus
  })
  axiosServer.AxiosPost(qs.stringify(data), '/Model/AddMTapplyModel').then(res => {
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
}
/**
 * 加载
 */
const dataInit = () => {
  var val = { applyDateApply: applyDateApply, applyNameApply: applyNameApply }
  axiosServer.AxiosPost(val, '/Model/GetMTapplyModel').then(res => {//res = [],如果id存在[{}...]，id不存在[]
    console.log('res初始化，空空', res)
    if (res.length == 1 && res[0].hasOwnProperty('modelId') && res[0].modelId!='') {
      modelModule.value = res[0]
    }else{
    }
  })
}
dataInit()
// 示例用法
// const arrayA: string[] = ['apple', 'banana', 'orange'];
// const arrayB: string[] = ['banana', 'grape', 'kiwi'];

// const comparisonResult = compareArrays(arrayA, arrayB);

// console.log('Missing in B:', comparisonResult.missing);
// console.log('Extra in B:', comparisonResult.extra);

const ModelModuleset = () => {
  //重新配置模块
};

</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>