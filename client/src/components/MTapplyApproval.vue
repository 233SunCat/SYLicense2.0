<template>
  <div style="width: 100%">
    <!-- 检索条件一排显示 -->
    <el-row :gutter="20" style="width: 100%">
      <el-col :span="3">
        <el-input :suffix-icon="Search" v-model="keyword" placeholder="关键字搜索"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="selectedOption" placeholder="下拉框条件选择" style="width: 200px">
          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="3">
        <el-date-picker v-model="startDate" type="date" placeholder="选择起始日期">
        </el-date-picker>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="3">
        <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4"> </el-col>
      <el-col :span="2">
        <el-button style="text-align: right" type="primary" icon="el-icon-download" @click="dataSearch">数据查询</el-button>
      </el-col>
      <el-col :span="3">
        <el-button style="text-align: right" type="primary" icon="el-icon-download"
          @click="exportToExcel">数据导出</el-button>
      </el-col>
    </el-row>
    <!--Excel表格导出-->>
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 -->
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column prop="applyNameApply" label="模块训练申请人"></el-table-column>
      <el-table-column prop="applyDateApply" label="申请时间"></el-table-column>
      <el-table-column prop="wxID" label="微信ID"></el-table-column>
      <el-table-column prop="modelNameApply" label="设备名称"></el-table-column>
      <el-table-column prop="processorSerialNumber" label="处理器序列号"></el-table-column>
      <el-table-column prop="hardDriveSerialNumber" label="硬盘序列号"></el-table-column>
      <el-table-column prop="applyStatusApply" label="审核状态"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.applyStatusApply === '通过' || scope.row.applyStatusApply === '拒绝'" type="success" plain @click="handleRowClick(scope.row)">
            查看详情
          </el-button>
          <el-button v-else-if="scope.row.applyStatusApply === '待审核'" type="primary" plain
            @click="handleRowClick(scope.row)">
            审核
          </el-button>
        </template>
      </el-table-column>
      <!-- 其他表格列... -->
    </el-table>
                  <el-dialog v-model="dialogFormVisible" title="申请详情">
            <div class="common-layout" style="height: 100%">
            <div style="height:60px;display: flex; align-items: center; justify-content: center;">
              <el-text class="line-break" size="large">申请模块详情</el-text>
            </div>
            <div style="height:60px;">
              <el-text class="line-break" size="large">申请状态: {{applyStatusApply}}</el-text>
            </div>
            <div style="height:60px;">
              <el-text class="line-break" size="large" style="margin-right:20px">申请人-{{applyNameApply}}</el-text>
              <el-text class="line-break" size="large" style="margin-right:20px">设备名称-{{modelNameApply}}</el-text>
              <el-text class="line-break" size="large" style="margin-right:20px">申请时间-{{applyDateApply}}</el-text>
            </div>
            <div style="display: flex; align-items: center; justify-content: center;">
            <el-form
              class="demo-form-inline"
              :label-position="labelPosition"
              label-width="120px"
              style="max-width: 100%; width: 80%"
            >
              <el-form-item
                :label="item.module+': '+item.moduleNum+'次'"
                v-for="(item, key) in moduleMap"
                :key="key"
                style="background-color: #f0f3f4"
              >
                <div style="width: 100%; height: 20px"></div>
                <el-row :gutter="10" style="width: 100%">
                  <el-col :span="6" v-for="(subitem,subkey) in item.moduleSub" :key="subkey">
                    <el-button type="info">{{ subitem }}</el-button>
                  </el-col>
                </el-row>
              </el-form-item>             
              <el-form-item>
                <el-button type="primary" @click="onSucsess" :disabled="disabled">确认通过</el-button>
                <el-button type="primary" @click="onRefuse" :disabled="disabled">拒绝</el-button>
              </el-form-item>
            </el-form>
            </div>
          </div>
        </el-dialog>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import XLSX from "xlsx";
import { useRouter } from "vue-router";
import axios from "axios";
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import dayjs from 'dayjs'
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'

// 定义数据
const keyword = ref("");
const selectedOption = ref("");
const startDate = ref(new Date());
const endDate = ref(new Date());
const options = ref([
  { label: "待审核", value: "待审核" },
  { label: "通过", value: "通过" },
  // 其他选项...
]);
const tableData = ref([]);

const dialogFormVisible = ref(false)
const moduleMap = ref([]);                       



//表格跳转
const disabled = ref(false)
var applyDateApply = ref()
var applyNameApply = ref()
var applyStatusApply = ref()
var modelNameApply = ref()
const handleRowClick = (row: any) => {
  console.log('加载审批1111111111')
  dialogFormVisible.value = true
  applyDateApply.value = row.applyDateApply
  applyNameApply.value = row.applyNameApply
  applyStatusApply.value = row.applyStatusApply
  modelNameApply.value = row.modelNameApply
  disabled.value = false
  if(row.applyStatusApply != '待审核'){
    disabled.value = true
  }
    const formData = reactive({
    applyNameApply: row.applyNameApply,
    applyDateApply: row.applyDateApply
  })
  console.log('formData',formData)
    axiosServer.AxiosPost(qs.stringify(formData), '/Model/GetmodelModuleAllocation').then(res => {
      moduleMap.value = res.pop().modelModuleAllocation
      console.log('moduleMap',moduleMap.value)

  })
}

const onSucsess = () => {//同意
    var formInline = reactive({
      applyDateApply : applyDateApply.value,
      applyNameApply : applyNameApply.value,
      applyStatusApply : '通过'
    })
    axiosServer.AxiosPost(qs.stringify(formInline), '/Model/AddMTapplyApproval').then(res => {
      if (res.success == true) {
        messageBox.MessageBox('保存成功')
        dataSearch()//刷新
      } else {
        messageBox.MessageBox('保存失败')
      }
    })
}
const onRefuse = () => {
    var formInline = reactive({
      applyDateApply : applyDateApply,
      applyNameApply : applyNameApply,
      applyStatusApply : '拒绝'
    })
    axiosServer.AxiosPost(qs.stringify(formInline), '/Model/AddMTapplyApproval').then(res => {
      if (res.success == true) {
        messageBox.MessageBox('保存成功')
        dataSearch()
      } else {
        messageBox.MessageBox('保存失败')
      }
    })
}
var searchData = new FormData();
//查询条件

const router = useRouter();
var uploadData = new FormData();

//通信
const dataSearch = async() => {
  const searchData = { keyword: keyword.value, startDate: startDate.value, endDate: endDate.value }
  const result =  await axiosServer.AxiosPost(qs.stringify(searchData), '/Model/ModelApplySearch')
  tableData.value = result.map(item => {
        item.applyDateApply = dayjs(item.applyDateApply).format("YYYY-MM-DD hh:mm:ss")
        item.arrivalDateApply = dayjs(item.arrivalDateApply).format("YYYY-MM-DD hh:mm:ss")
        return item;
      });
};
</script>
