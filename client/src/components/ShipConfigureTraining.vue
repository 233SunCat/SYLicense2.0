<template>
  <div class="common-layout">
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
                      <el-option v-for="item in selectEquipmentName" :label="item" :value="item" :key="item" />
                    </el-select>
                  </el-form-item>
                  <br/>
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
                            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="formInline.equipmentModule" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="item in module" :key="item" :label="item">{{
                                    item
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
              <el-form-item label="设备数量/台：">
                <el-input style="width: 100%;" v-model="formInline.equipmentNumber" placeholder="设备数量" clearable
                  @input="InputChange(formInline.equipmentNumber)" :disabled="netDisabled" />
              </el-form-item>
              <el-form-item label="设备编号：" v-for="item, index in formInline.equipmentIds" :key="index">
                <el-input style="width: 100%;" v-model="formInline.equipmentIds[index]" :key="index" clearable
                  :disabled="netDisabled" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="EquipmentSubmit" :disabled="netDisabled">确认保存</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="netDisabled">取消</el-button>              
              </el-form-item>                
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple" />
            <el-timeline>
              <el-timeline-item>
                <el-button type="primary" plain @click="DownloadExe">下载生成工具</el-button>
              </el-timeline-item>
              <el-timeline-item>
                <el-upload v-model:file-list="fileList" class="upload-demo"
                  action="http://localhost:3000/DownloadAndUpload/tenpinfo" :on-change="handleChange">
                  <el-button type="primary" plain>上传tenpinfo文件</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      管理员权限运行exe文件后,上传tenpinfo文件
                    </div>
                  </template>
                </el-upload>
              </el-timeline-item>
              <el-timeline-item>
                <el-button type="primary" plain @click="ConfigurationModule">配置训练模块</el-button>
                <el-dialog v-model="dialogFormVisible" title="维修记录">
                <ConfigureTrainingApply />
              </el-dialog>
              </el-timeline-item>
              <el-timeline-item>
                <el-button type="primary" plain @click="DownloadModule">下载配置模块</el-button>
              </el-timeline-item>
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
import { ElMessage } from 'element-plus';

import * as constants from '../constants.json';
import axios from 'axios';
import type { UploadProps, UploadUserFile } from 'element-plus'
import type { UploadInstance } from 'element-plus'
const uploadRef = ref<UploadInstance>()


const selectEquipmentName = constants.selectEquipmentName
var dialogFormVisible = ref(false)
var dialogEqAdd = ref(false)
const equipmentSelect = ref('')
const netDisabled = ref(false)
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
  equipmentNames: Equipment[];
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

const checkAll = ref(false)
const isIndeterminate = ref(true)
const cities = constants.Module
//处理xml文件
const module = ref([])
const ModuleXml = () => {
    axiosServer.AxiosGet( '/Model/ModelModuleXml').then(res=>{
        module.value = res
    })
}
ModuleXml()
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
/**
 * 下载工具
 */
const DownloadExe = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/DownloadAndUpload/SYGenInfo', // 替换为实际路由
      responseType: 'blob', // 重要：responseType必须是'blob'以处理二进制数据
    });

    // 从二进制数据创建blob
    const blob = new Blob([response.data], { type: 'application/octet-stream' });

    // 创建链接元素并触发下载
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'SYGenInfo.exe'; // 替换为所需的文件名
    link.click();
  } catch (error) {
    console.error('下载文件时出错：', error);
  }
}
/**
 * 上传文件
 */
 const fileList = ref<UploadUserFile[]>([])
const handleChange = async (file, fileList) => {
  //fileList.value = fileList.value.slice(-3)
  // 处理上传结果
  if (file.status === 'success') {
    // 显示上传成功的提示
    ElMessage.success('文件 上传成功!');
  } else if (file.status === 'error') {
    // 显示上传失败的提示
    ElMessage.error('文件 上传失败，请重试或联系管理员!');
  }
};
/**
 * 配置训练模块
 */
const ConfigurationModule = () => {
  dialogFormVisible.value = true;
}
const generateNewEquipmentInfo = (name) => {
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
  return result.map(item => ({ equipmentName: item.equipmentName, equipmentModule: item.equipmentModule, equipmentStyle: item.equipmentStyle, equipmentId: item.equipmentId }))
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
  console.log('formInline', formInline)
  const { equipmentNames, ...newfornInline } = formInline;
  //发送请求.
  axiosServer.AxiosPost(qs.stringify(newfornInline), '/ShipClient/AddShipEquipment').then(res => {
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
}
/**
 * 查看单类型设备信息
 * @param item 
 */
const HandleFormSearch = (item) => {//内存表单查询
  console.log('查看设备',item)
  formInline.equipmentIds = []
  formInline.equipmentNumber = item.equipmentNumber
  formInline.equipmentStyle = item.equipmentStyle
  formInline.equipmentModule = item.equipmentModule
  formInline.equipmentName = item.equipmentName
  item.equipmentIds.forEach((res, index) => {
    formInline.equipmentIds.push(res)
  })
  //NetDisable();
  NotNetDisable()
}

/**
 * 直接加载
 */
const handerBus = async (val: any) => {
  console.log('发货配置器')
  NetDisable();
  formInline.clientName = val.clientName
  formInline.orderDate = val.orderDate
  formInline.orderStatus = val.orderStatus
  formInline.equipmentNumber = ''
  formInline.equipmentStyle = ''
  formInline.equipmentModule = []
  formInline.equipmentName = ''
  formInline.equipmentIds = []

  //EventBus.off('slide-ship-order', handerBus)
  console.log('formInline',formInline)
  axiosServer.AxiosPost(val, '/ShipClient/GetShipEquipmentNames').then(res => {//res = [],如果id存在[{}...]，id不存在[]
    const data = formMap(res)
    const formData = processEquipmentData(data)
    processEquipmentButton(formData)
  })
}
EventBus.on('slide-ship-order', handerBus)

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
  