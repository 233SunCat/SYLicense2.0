<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">设备信息</el-text>
      </el-header>
      <el-main style="background-color: #ffffff;">
        <el-row :gutter="0">
          <el-col :span="12">
            <div class="grid-content ep-bg-purple" /> <el-form class="demo-form-inline" :label-position="labelPosition"
              label-width="120px" style="max-width: 460px;width: 60%;">
              <el-form-item>
                <el-button plain @click="EquipmentAdd">
                  <el-icon size="large">
                    <CirclePlus />
                  </el-icon>
                </el-button>
                <el-form-item>
                  <el-row :gutter="30">
                    <el-col :span="12" v-for="item in formInline.equipmentNames" :key="item">
                      <el-button type="info" @click="dataSearch">{{ item }}</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-dialog v-model="dialogEqAdd" title="添加设备" style="width: 500px;">
                  <el-form-item label="选择设备：">
                    <el-select style="width: 50%" v-model="equipmentSelect" placeholder="请选择设备" clearable>
                      <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                      <el-option label="虚实结合腹腔镜" value="虚实结合腹腔镜" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="确定">
                    <el-button type="info" @click="EquipmentSelect(equipmentSelect)">确定</el-button>
                  </el-form-item>
                </el-dialog>
              </el-form-item>
              <el-form-item label="设备型号：">
                <el-input style="width: 100%;" v-model="formInline.equipmentStyle" placeholder="请填写设备型号"
                  :disabled="netDisabled" clearable />
              </el-form-item>
              <el-form-item label="模块选择：">
                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                  :disabled="netDisabled">全选</el-checkbox>
                <el-checkbox-group v-model="formInline.equipmentModule" @change="handleCheckedCitiesChange"
                  :disabled="netDisabled">
                  <el-checkbox v-for="item in cities" :key="item" :label="item">{{
                    item
                  }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="设备数量/台：">
                <el-input style="width: 100%;" v-model="formInline.equipmentNumber" placeholder="设备数量" clearable
                  @input="InputChange(formInline.equipmentNumber)" />
              </el-form-item>
              <el-form-item label="设备编号：" v-for="item in formInline.equipmentIds" :key="item.id">
                <el-input style="width: 100%;" v-model="item.str" :key="item.id" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确认保存</el-button>
                <el-button type="primary">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple" />
            <el-timeline>
              <el-timeline-item v-for="index in activities" :key="index.buttonText" :timestamp="index.context">
                <el-button type="primary" plain>{{ index.buttonText }}</el-button>
              </el-timeline-item>
              <el-dialog v-model="dialogFormVisible" title="维修记录">
                <ConfigureTrainingApply />
              </el-dialog>
            </el-timeline>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { CirclePlus } from "@element-plus/icons-vue";

import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import ConfigureTrainingApply from './ConfigureTrainingApply.vue'
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server.js'
const input = ref('')
var dialogFormVisible = ref(false)
var dialogEqAdd = ref(false)
const equipmentSelect = ref('')
const netDisabled = ref(true)
var equipmentIds = ref()
const labelPosition = ref<FormProps['labelPosition']>('right')

interface FormInlineData {
  equipmentNames: string[];
  equipmentStyle: string;
  equipmentNumber: string;
  equipmentIds:  {id: number, str: string}[];
  equipmentName: string;
  equipmentModule: string[],
  clientName: string,
  orderDate: Date,
  orderStatus: string
}
const formInline = reactive({//这里就是获取的数据
  equipmentNames: [],
  equipmentStyle: '',
  equipmentNumber: '',
  equipmentIds: [{id:0,str:''}],
  equipmentName: '',
  equipmentModule: [],
  clientName:'',
  orderDate:'',
  orderStatus:''
})
var newformInline = reactive({//这里就是获取的数据
  equipmentStyle: '',
  equipmentNumber: '',
  equipmentIdss: [],
  equipmentName: '',
  equipmentModule: [],
  clientName:'',
  orderDate:'',
  orderStatus:''
})
const items = ref(['实物训练', '基础技能训练'])
const activities = [
  {
    buttonText: '下载生成工具',
    context: '下载生成工具',
  },
  {
    buttonText: '上传tenpinfo文件',
    context: '以管理员身份运行',
  },
  {
    buttonText: '配置训练模块',
    context: '文件成功上传后',
  },
  {
    buttonText: '下载配置模块',
    context: '',
  },
]
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref([])
const cities = ['镜头训练', '分离训练', 'FLS技能训练', '剪切训练', '钛夹训练', '电凝训练', '双手合作训练', '抓取训练']
const ClientName = ref('')

EventBus.on('slide-ship', (val: any) => {
  ClientName.value = val
  //formInline.equipmentNames = GetEquipmentName()
  console.log(val)
  formInline.clientName = val.clientName
  formInline.orderDate = val.orderDate
  formInline.orderStatus = val.orderStatus
})
const InputNumArry = (num) => {//数字转数组
  // 确定字典数组的长度  
  const length = num;

  // 创建一个字典数组  
  const dictArray: { id: number, str: string }[] = [];

  // 使用循环来填充字典数组  
  for (let i = 1; i <= length; i++) {
    dictArray.push({ id: i, str: '' });
  }

  return dictArray
}
const InputChange = (num: any) => {//输入框触发
  //equipmentIds = num
  //equipmentIds.value = InputNumArry(num)
  formInline.equipmentIds = InputNumArry(num)
  //console.log(InputNumArry(num))
}

//接受菜单栏医院名称，同时触发事件从加载医院数据
const handleCheckAllChange = (val: boolean) => {
  formInline.equipmentModule = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
const dataSearch = () => {//触发事件-设备按钮，返回某医院某设备的所有信息
  const data = GetEquipment();
  formInline.equipmentStyle = data.equipmentStyle
  formInline.equipmentNumber = data.equipmentNumber
  //formInline.equipmentIds = data.equipmentIds
  formInline.equipmentModule = data.module

}
const EquipmentAdd = () => {//触发事件-增加设备
  dialogEqAdd.value = true
}
const EquipmentSelect = (name: any) => {//下拉框选择设备
  dialogEqAdd.value = false
  formInline.equipmentName = name;
  formInline.equipmentNames.push(name)
  NetDisable()
}
const NetDisable = () => {//禁止输入
  netDisabled.value = false;
}
const SaveFault = () => {//保存失败弹框
  ElMessageBox.alert('保存失败', '提示：', {
    confirmButtonText: '确认',
  })
}

//通信-添加
const onSubmit = () => {//保存数据
  console.log()
  //发送请求
  //axiosServer.AxiosPost(formInline, '/ShipClient/AddEquipment')
  //保存成功会加弹框，重新加载设备信息页，同时禁止输入
  //判断如果是禁止输入状态则弹框保存失败

}
//通信-查看
const GetEquipmentName = () => {//数据库获得某个医院现有的所有设备名称
  return ['123', '456']
}
const GetEquipment = () => {
  return { equipmentStyle: '456789', equipmentNumber: '123', equipmentIds: [{id:1,str:''}], module: ['镜头训练', '剪切训练'] }
}


</script>
  
<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
  