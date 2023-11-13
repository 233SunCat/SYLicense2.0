<template style="height:100%;">
    <div style="height: 100%;width: 100%;">
      <div style="
                    display: flex;
                    justify-content: center;
                  ">
        <el-text class="mx-1" style="font-size: 20px">力反馈腹腔镜</el-text>
        <el-tag style="margin: 10px">在保</el-tag>
        <br />
        <el-tag style="margin: 10px" class="ml-2" type="warning">已维修</el-tag>
      </div>
      <div style="
                    height: 8%;
                    display: flex;
                    justify-content: center;
                  ">
        <el-tag class="ml-2" type="info">用户-苏州人民医院</el-tag>
        <el-tag class="ml-2" type="info">设备编号- TTS</el-tag>
        <el-tag class="ml-2" type="info">质保期- 3年</el-tag>
        <el-tag class="ml-2" type="info">剩余质保期- 1年</el-tag>
      </div>
      <div>
        <div style="
                    display: flex;
                    justify-content: center;
                  ">
          <el-text class="mx-1" style="font-size: 20px">故障详情</el-text>
        </div>
        <div style="
                    display: flex;
                    justify-content: center;
                  ">
          <el-form :inline="false" class="demo-form-inline" :label-position="labelPosition" label-width="120px">
            <el-form-item label="故障时间">
              <el-input v-model="inputDate" disabled clearable>初始值</el-input>
            </el-form-item>
            <el-form-item label="故障现象描述">
              <el-input v-model="inputPhenomenon" disabled clearable>初始值</el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="inputNotes" disabled clearable>初始值</el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">填写维修记录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="width: 100%;">
        <el-row :gutter="20" style="width: 100%;">
              <el-col :span="3">
                  <el-date-picker v-model="startDate" type="date" placeholder="选择起始日期">
                  </el-date-picker>
              </el-col>
              <el-col :span="1">
              </el-col>
              <el-col :span="3">
                  <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期">
                  </el-date-picker>
              </el-col>
          </el-row>
        <el-table :data="tableData">
          <el-table-column prop="name" label="序号"></el-table-column>
          <el-table-column prop="deviceName" label="状态"></el-table-column>
          <el-table-column prop="deviceId" label="故障时间"></el-table-column>
          <el-table-column prop="userName" label="故障现象"></el-table-column>
          <el-table-column prop="warrantyPeriod" label="故障图片"></el-table-column>
          <el-table-column prop="remainingWarranty" label="维修人"></el-table-column>
          <el-table-column prop="failureTime" label="维修时间"></el-table-column>
          <el-table-column prop="failurePhenomenon" label="维修地点"></el-table-column>
          <el-table-column prop="status" label="维修方式"></el-table-column>
          <el-table-column prop="operation" label="维修成本/元"></el-table-column>
          <el-table-column prop="operation" label="维修内容"></el-table-column>
          <el-table-column prop="operation" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </template>
    
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormProps } from 'element-plus'
  const startDate = ref('');
  const endDate = ref('');
  const labelPosition = ref<FormProps['labelPosition']>('right')
  const inputDate = ref('初始值');
  const inputPhenomenon = ref('初始值')
  const inputNotes = ref('初始值')
  const tableData = ref([
    // 其他表格数据...  
  ]);
  </script>
  <style lang="less">
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  
  .ml-2 {
    margin: 10px;
  }
  </style>
    