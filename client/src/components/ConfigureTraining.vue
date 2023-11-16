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
              <el-form-item label="模块信息：">
                <el-row :gutter="30" >
                  <el-col :span="8" v-for="item in text" :key="item">
                    <el-button type="info" @click="onButton(item.name)">{{ item.name }}</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="设备编号：">
                <el-input style="width: 100%;" v-model="formInline.equipmentId" placeholder="设备编号" clearable />
              </el-form-item>
              <el-form-item label="软件版本：">
                <el-input style="width: 100%;" v-model="formInline.equipmentId" placeholder="软件版本" clearable />
              </el-form-item>
              <el-form-item label="生产地：">
                <el-input style="width: 100%;" v-model="formInline.equipmentId" placeholder="生产地" clearable />
              </el-form-item>
              <el-form-item label="备注">
                <el-input style="width: 100%;" v-model="formInline.notes" placeholder="输入其他备注信息" clearable />
              </el-form-item>
              <el-form-item label="处理器序列：">
                <el-input style="width: 100%;" v-model="formInline.notes" placeholder="处理器序列" clearable />
              </el-form-item>
              <el-form-item label="硬盘序列号：">
                <el-input style="width: 100%;" v-model="formInline.notes" placeholder="硬盘序列号" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确认保存</el-button>
                <el-button type="primary">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple" />
            <el-timeline>
              <el-timeline-item v-for="index in activities" :key="index.buttonText" :timestamp="index.context">
                <el-button type="primary" plain @click="onSubmit(index)">{{ index.buttonText }}</el-button>
              </el-timeline-item>
              <el-dialog v-model="dialogFormVisible" title="维修记录">
                  <ConfigureTrainingApply/>
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
import { defineComponent } from 'vue'

import axios from "axios";
import ButtonUpload from '@/components/ButtonUpload.vue'
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import ConfigureTrainingApply from './ConfigureTrainingApply.vue'
import EventBus from "../assets/common/event-bus"

const input = ref('')
var dialogFormVisible = ref(false)
const labelPosition = ref<FormProps['labelPosition']>('right')
const formInline = reactive({//这里就是获取的数据
  clientName: '',
  equipmentName: '',
  equipmentId: '',
  faultDate: '',
  faultPhenomenon: '',
  notes: ''
})
const formLabelWidth = '140px'
const form = reactive({
  repairEngineer: '',
  repairTime: '',
  repairLocation: '',
  repairMoney: '',
  repairContext: '',
  repairNotes: '',
  checked1: false,
  checked2: false
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
const checkedCities = ref(['镜头训练', '分离训练'])
const cities = ['镜头训练', '分离训练', 'FLS技能训练', '剪切训练', '钛夹训练', '电凝训练', '双手合作训练', '抓取训练']
const fenghecities = ['缝合训练', '打结训练']
const shoushucities = ['胆囊胆道手术', '打结训练','妇科手术','阑尾切除手术','乙状结肠切除手术']


const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
const selectedOption = ref("");
const options = ref([
  { label: "不限制", value: "不限制" },
  // 其他选项...
]);
const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}
const buttonContext = ref('初始值');  

//slide-menuturn通信模块
const text = ref([])
EventBus.on('slide-training', (val: any)=>{
  text.value = val 
  //buttonContext.value = text.value;
})



//请求函数
const DownloadFile = () => {//下载文件
  axios.get('/download')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.error(error)
    })
}
const SubmitFile = () => {//上传文件
  const submitFile = new FormData();
  axios(
    {
      url: '/Equipment/EquipmentSubmit',
      data: submitFile,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      console.log(res.data)
    })
}
//下载生成工具
const onSubmit = (data: any) => {
  // 这里处理菜单项的点击事件  
  if (data.buttonText == "下载生成工具") {
    //服务端请求，下载文件

  } else {
    if (data.buttonText == "上传tenpinfo文件") {
      //上传文件

    } else {
      if (data.buttonText == "配置训练模块") {
        //console.log("配置训练模块")
        dialogFormVisible.value = true;
        //console.log(dialogFormVisible)
      }
    }
  }
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
