<template>
  <div>
    <el-form :model="form" :inline="false" class="demo-form-inline" :label-position="labelPosition" label-width="120px">
      <div  :key="key" v-for="(item,key) in module">
      <el-form-item :label="item.module">
        <el-checkbox :v-model="checkAll[item.module]" :indeterminate="isIndeterminate" @change="handleCheckAllChange(item.module ,item.subModule)">全选</el-checkbox>
        <el-checkbox-group v-model="checkedModule[item.module]" @change="handleCheckedCitiesChange(item.module, item.subModule)">
          <el-checkbox  :key="subKey" :label="subItem" v-for="(subItem, subKey) in item.subModule">{{
            subItem
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数量配置：">
        <el-select v-model="selectModule[item.module]" placeholder="下拉框条件选择" size="mini" style="margin-right:20px">
          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-input-number v-model="numModule[item.module]" :min="1" :max="999" />
      </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, inject } from "vue";
import type { FormProps } from "element-plus";
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import axiosServer from '../assets/common/axios-server'
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'
import qs from 'qs'; // 引入 qs 库
import { defineProps, defineEmits } from 'vue';
var props = defineProps(['message'])
const route = useRoute();
const labelPosition = ref<FormProps["labelPosition"]>("right");
const equipmentId = ref(route.query.equipmentId)
// 其他表格数据...
const form = reactive({
  equipmentId: equipmentId,
  repairEngineer: '',
  repairTime: '',
  repairLocation: '',
  repairMoney: '',
  repairContext: '',
  repairNotes: '',
  checked1: false,
  checked2: false
})
const checkAll = ref({})
const checkedModule = ref({})
const numModule =ref({})
const selectModule =ref({})
const isIndeterminate = ref(false)

const options = ref([
  { label: "不限制", value: "不限制" },
  { label: "限制", value: "限制" },
  // 其他选项...
]);
/**
 * 初始化模块下拉框和训练次数
 */
const SelectAndNumInit = (data) => {
//
  console.log('data',data)
  data.forEach(element => {
    selectModule.value[element.module]  =  '不限制'
  });
  data.forEach(element => {
    numModule.value[element.module]  =  999
  });
  console.log('selectModule',selectModule.value)
}

//获取所有选择，点击申请
const onSubmit = () =>{
  const result = Object.keys(selectModule.value).map((module: string) => ({
    module: module,
    moduleSelect: selectModule.value[module],
    moduleNum: numModule.value[module],
    moduleSub: checkedModule.value[module]
  }));
  const formData = reactive({
    applyNameApply: props.message.applyNameApply,
    applyDateApply: props.message.applyDateApply,
    modelModuleAllocation: result
  })
    axiosServer.AxiosPost(qs.stringify(formData), '/Model/AddmodelModuleAllocation').then(res => {
    if (res.success == true) {
        messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })

}

const handleCheckAllChange = (module,subModule) => {
    if(checkAll.value[module] == false){
      checkAll.value[module] = true
    }else{
      checkAll.value[module] = false
    }
    checkedModule.value[module] = checkAll.value[module] ? subModule : []
    isIndeterminate.value = false
    // 在这里可以使用 selectAll 参数

}

const module = ref([])
const ModuleXml = () => {
    axiosServer.AxiosGet( '/Model/ModelModuleXmlObject').then(res=>{
      console.log('res',res)
        module.value = res
        module.value.forEach(item => {
        checkAll.value[item.module] = false
        })
        SelectAndNumInit(res)
        const formData = reactive({
          applyNameApply: props.message.applyNameApply,
          applyDateApply: props.message.applyDateApply,
        })
        axiosServer.AxiosPost(qs.stringify(formData), '/Model/GetMTapplyModule').then(resArry => {
          const modelModuleApply = resArry.pop().modelModuleApply
          const result = {};

          // 遍历data1，匹配data2，合并到result中
          module.value.forEach(item => {
              const moduleName = item.module;
              const matchedSubModules = item.subModule.filter(subModule => 
                modelModuleApply.includes(subModule));
              checkedModule.value[moduleName] = matchedSubModules;
          });
  })
    })
}
ModuleXml()

</script>