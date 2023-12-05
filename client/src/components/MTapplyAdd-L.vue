<template>
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
      style="max-width: 460px; width: 40%"
    >
      <el-form-item label="选择发货样机">
              <el-select style="width: 100%;" v-model="modelNameId" placeholder="设备名称" clearable @focus="GetModename" @change="handleSelectClick(modelName,modelApplyModule)">
                  <el-option v-for="item in items" :key="item" :label="item" :value="item" />
              </el-select>
      </el-form-item>
      <el-form-item label="模块信息：">
        <el-row :gutter="32">
          <el-col :span="8" v-for="item in text" :key="item">
            <el-button type="info" @click="onButton(item)">{{
              item
            }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-text class="mx-1" type="danger">{{modulePe}}</el-text>
      </el-form-item>
      <el-form-item>
        <el-text class="mx-1" type="danger">多余模块：{{moduleAdd}}</el-text>
      </el-form-item>
      <el-form-item>
        <el-text class="mx-1" type="danger">不足模块：{{moduleMinus}}</el-text>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">配置训练模块222</el-button>
                      <el-dialog v-model="dialogFormVisible" title="维修记录">
                  <ConfigureTrainingApply/>
              </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from "vue";
import axios from "axios";
import type { FormProps } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { useRouter, useRoute } from 'vue-router';
import ConfigureTrainingApply from './ConfigureTrainingApply.vue'

const route = useRoute();

const moduleAdd = ref([""]);
const moduleMinus = ref([""]);
var dialogFormVisible = ref(false)

const modulePe = ref("");
const text = ref(["实物训练", "基础技能训练"]);
const items = ref([''])

const modelApplyName =  ref(route.query.modelApplyName);
const modelUsedName =  ref(route.query.modelUsedName);
const modelName =  ref(route.query.modelName);
const modelApplyModule =  ref(route.query.modelModule);
const modelArrivalTime =  ref(route.query.modelArrivalTime);
const modelUsedFunction =  ref(route.query.modelUsedFunction);

const modelNameId = ref('')
//通信
const modelSearch=(modelName)=>{//查询可以使用的样机
      
    return ['力反馈123','力反馈456','力反馈789']
}
const GetModename = () => {
  //获得样机列表，在库，流转
};
const GetModemodule = (modeName) => {//根据样机名称获得模块
  //根据样机，获得模块
  const module = ['实物训练','技能基础训练']
  return module
};
//事件
const selectInit=(modelName)=>{//下拉框，跳转后直接初始化
    const modelList =  modelSearch(modelName)//查找可以正常使用的样机
    if(modelList.length != 0){
      modelNameId.value = modelList[0]
      items.value  = modelList
    }else{
      modelNameId.value = ''
      items.value  = ['']
    }
    return
}

function compareArrays(a: string[], b: string[]): { missing: string[], extra: string[] } {
    const missing: string[] = a.filter(item => !b.includes(item));
    const extra: string[] = b.filter(item => !a.includes(item));

    return { missing, extra };
}
const handleSelectClick = (modeName,modelApplyModule) => {
  const modelModule = GetModemodule(modeName)
  const comparisonResult =  compareArrays(modelApplyModule,modelModule)
  console.log('样机模块',modelModule)
  console.log('申请模块',modelApplyModule)
  console.log('Missing in 样机:', comparisonResult.missing);
  console.log('Extra in 样机:', comparisonResult.extra);
  moduleAdd.value = comparisonResult.extra
  moduleMinus.value = comparisonResult.missing
};
const onSubmit = () => {
          dialogFormVisible.value = true;
}

//函数初始化
handleSelectClick(modelName.value,modelApplyModule.value)
// 示例用法
// const arrayA: string[] = ['apple', 'banana', 'orange'];
// const arrayB: string[] = ['banana', 'grape', 'kiwi'];

// const comparisonResult = compareArrays(arrayA, arrayB);

// console.log('Missing in B:', comparisonResult.missing);
// console.log('Extra in B:', comparisonResult.extra);

const ModelModuleset = () => {
  //重新配置模块
};


selectInit(modelName);


</script>
  
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  