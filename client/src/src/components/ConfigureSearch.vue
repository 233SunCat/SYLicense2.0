<template>
    <div class="common-layout" style="height: 100%;">
      <el-container style="height: 100%;">
        <el-header
          style="background-color: #f6f8f8; display: flex; align-items: center; ">
          <el-text class="mx-1" size="large">样机流转记录</el-text>
        </el-header>
        <el-main style="background-color: #ffffff;">
          <div style="width: 100%">
      <!-- 检索条件一排显示 -->
      <el-row :gutter="20" style="width: 100%">
        <el-col :span="3">
          <el-button type="primary">新增样机流转</el-button>
        </el-col>
        <el-col :span="16">
        </el-col>
        <el-col :span="2">
          <el-button style="text-align: right" type="primary" icon="el-icon-download">数据查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button style="text-align: right" type="primary" icon="el-icon-download"
            >数据导出</el-button>
        </el-col>
      </el-row>
      <!--Excel表格导出-->>
      <el-table style="width: 100%">
        <!-- 表格列定义 -->
        <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
        <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
        <el-table-column prop="equipmentId" label="设备编号"></el-table-column>
        <el-table-column prop="clientName" label="用户/样机名称"></el-table-column>
        <el-table-column prop="qualityDate" label="质保期"></el-table-column>
        <el-table-column prop="qualityDate" label="质保剩余时间"></el-table-column>
        <el-table-column prop="faultDate" label="故障时间"></el-table-column>
        <el-table-column prop="faultPhenomenon" label="故障现象"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <!-- 其他表格列... -->
      </el-table>
    </div>
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
  