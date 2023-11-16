<template>
    <div class="common-layout" style="height: 100%;">
      <el-container style="height: 100%;">
        <el-header
          style="border-color:red;border-style:solid;background-color: #f6f8f8; display: flex; align-items: center; ">
          <el-text class="mx-1" size="large">设备信息</el-text>
        </el-header>
        <el-main style="border-color:blue;border-style:solid;background-color: #ffffff;">
            <el-row :gutter="20">
    <el-col :span="12">
      <div class="grid-content ep-bg-purple" /> <el-form class="demo-form-inline" :label-position="labelPosition"
        label-width="120px" style="max-width: 460px;width: 40%;">
        <el-form-item label="模块信息：">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-button type="primary">按钮1</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="success">按钮2</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="warning">按钮3</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="danger">按钮4</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-button type="primary">按钮1</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="success">按钮2</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="warning">按钮3</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="danger">按钮4</el-button>
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
          <el-button type="primary" plain>{{ index.buttonText }}</el-button>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
        </el-main>
      </el-container>
    </div>
  </template>
  <script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from "axios";
import ButtonUpload from '@/components/ButtonUpload.vue'
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
const input = ref('')

const labelPosition = ref<FormProps['labelPosition']>('right')
const formInline = reactive({//这里就是获取的数据
  clientName: '',
  equipmentName: '',
  equipmentId: '',
  faultDate: '',
  faultPhenomenon: '',
  notes: ''
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
]
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
  