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
                <el-button plain @click="EquipmentAdd" :disabled="addDisabled">
                  <el-icon size="large">
                    <CirclePlus />
                  </el-icon>
                </el-button>
                <el-form-item>
                  <el-row :gutter="30">
                    <el-col :span="12" v-for="item in formInline.equipmentNames" :key="item">
                      <el-button type="info" @click="HandleFormSearch(item)">{{ item.equipmentName }}</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-dialog v-model="dialogEqAdd" title="添加设备" style="width: 500px;">
                  <el-form-item label="选择设备：">
                    <el-select style="width: 50%" v-model="equipmentSelect" placeholder="请选择设备" clearable>
                      <el-option v-for="item in selectEquipmentName" :label="item" :value="item" :key="item"/>
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
                  @input="InputChange(formInline.equipmentNumber)" :disabled="netDisabled" />
              </el-form-item>
              <el-form-item label="设备编号：" v-for="item,index in formInline.equipmentIds" :key="index">
                <el-input style="width: 100%;" v-model="formInline.equipmentIds[index]" :key="index" clearable :disabled="netDisabled"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="EquipmentSubmit" :disabled="netDisabled">确认保存</el-button>
                <el-button type="primary" :disabled="netDisabled">取消</el-button>
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
import ConfigureTrainingApply from './ConfigureTrainingApply.vue'
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import messageBox from '../assets/common/message-box'
import * as constants from '../constants.json';

const selectEquipmentName = constants.selectEquipmentName
var dialogFormVisible = ref(false)
var dialogEqAdd = ref(false)
const equipmentSelect = ref('')
const netDisabled = ref(true)
const addDisabled = ref(false)
const labelPosition = ref<FormProps['labelPosition']>('right')
type Equipment = {
  equipmentName: string;
  equipmentModule: string[];
  equipmentStyle: string;
  equipmentId: string;
  equipmentIds: string[];
  str: string[];
  equipmentNumber: number;
};
interface FormInlineData {
  equipmentNames:  Equipment[];
  equipmentStyle: string;
  equipmentNumber: string;
  equipmentIds: string[];
  equipmentName: string;
  equipmentModule: string[],
  clientName: string,
  orderDate: Date,
  orderStatus: string
}
const formInline = reactive<FormInlineData>({//这里就是获取的数据
  equipmentNames: [],
  equipmentStyle: '',
  equipmentNumber: '',
  equipmentIds: [],
  equipmentName: '',
  equipmentModule: [],
  clientName: '',
  orderDate: new Date,
  orderStatus: ''
})

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
const cities = constants.Module
/**
 * 
 * 输入框触发
 */
const InputChange = (num: any) => {
  formInline.equipmentIds = Array.from({ length: num }, () => "");
}
/**
 * 输入框清零
 */
 const InputClean = () => {
  formInline.equipmentIds = []
  formInline.equipmentModule = []
  formInline.equipmentStyle = ''
  formInline.equipmentNumber = ''
}
const handleCheckAllChange = (val: boolean) => {
  formInline.equipmentModule = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
const generateNewEquipmentInfo = (name) =>{
    return {
    equipmentName: name,
    equipmentModule: [],
    equipmentStyle: "",
    equipmentId: "",
    equipmentIds: [],
    str: [],
    equipmentNumber: 0,
  };
}
//查看数据
// 定义设备信息的接口
interface EquipmentInfo {
  equipmentName: string;
  equipmentNumber: number;
}
interface EquipmentInfo {
  equipmentName: string;
  equipmentModule: string[];
  equipmentStyle: string;
  equipmentIds: string[];
  str: string[];
  equipmentNumber: number;
}
const processEquipmentData = (data: Record<string, any>[]): EquipmentInfo[] => {
  const equipmentInfoMap: Record<string, EquipmentInfo> = {};
  // 遍历原始数据数组
  data.forEach(item => {
    const key = `${item.equipmentName}-${item.equipmentModule.join('-')}-${item.equipmentStyle}`;

    // 检查是否已经存在于 equipmentInfoMap 中
    if (equipmentInfoMap[key]) {
      equipmentInfoMap[key].equipmentIds.push(item.equipmentId);
      equipmentInfoMap[key].str.push(item.equipmentId);
      equipmentInfoMap[key].equipmentNumber++;
    } else {
      equipmentInfoMap[key] = {
        ...item,
        equipmentIds: [item.equipmentId],
        str: [item.equipmentId],

        equipmentNumber: 1,
      };
    }
  });

  // 将结果转换为数组形式
  const equipmentInfoArray: EquipmentInfo[] = Object.values(equipmentInfoMap);

  return equipmentInfoArray;
};
const processEquipmentButton = (data) => {//生成动态按钮
  formInline.equipmentNames = data.filter(item => item.equipmentIds.length !== 1 || item.equipmentIds[0] !== '');
}
const formMap = (result) => {
    return result.map(item => ({equipmentName:item.equipmentName, equipmentModule:item.equipmentModule,equipmentStyle:item.equipmentStyle, equipmentId:item.equipmentId}))
}
const NetDisable = () => {//组件-禁止输入
  netDisabled.value = true;
}
const NotNetDisable = () => {//组件-y允许输入
  netDisabled.value = false;
}
/**
 * 下拉框选择设备
 * @param name 
 */
const EquipmentSelect = (name: any) => {//下拉框选择设备
  dialogEqAdd.value = false
  formInline.equipmentName = name;
  const data = generateNewEquipmentInfo(name)
  formInline.equipmentNames.push(data)
  NotNetDisable()
  InputClean()
}
/**
 * 添加新的设备
 */
const EquipmentAdd = () => {//触发事件-增加设备
  dialogEqAdd.value = true
}
/**
 * 保存设备信息
 */
const EquipmentSubmit = () => {//保存失败弹框
  console.log('formInline',formInline)
  const { equipmentNames, ...newfornInline } = formInline;
  //发送请求.
  axiosServer.AxiosPost(qs.stringify(newfornInline), '/ShipClient/AddShipEquipment').then(res => {
      if(res.success == true){

            messageBox.MessageBox('保存成功')
        }else{
            messageBox.MessageBox('保存失败')
        }
  })
}
/**
 * 查看单类型设备信息
 * @param item 
 */
 const HandleFormSearch = (item) => {//内存表单查询
  formInline.equipmentIds = []
  formInline.equipmentNumber = item.equipmentNumber
  formInline.equipmentStyle = item.equipmentStyle
  formInline.equipmentModule = item.equipmentModule
  item.equipmentIds.forEach((res,index) => {
    formInline.equipmentIds.push(res)
  })
  NetDisable();
}

/**
 * 直接加载
 */
EventBus.on('slide-ship-order', async (val: any) => {
    NetDisable();
    console.log('val',val)
    formInline.clientName = val.clientName
    formInline.orderDate = val.orderDate
    formInline.orderStatus = val.orderStatus
    axiosServer.AxiosPost(val,'/ShipClient/GetShipEquipmentNames').then(res=>{//res = [],如果id存在[{}...]，id不存在[]
      const data = formMap(res)
      const formData =  processEquipmentData(data)
      processEquipmentButton(formData)
    })
})
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
  