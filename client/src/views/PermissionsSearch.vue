<template>
  <div style="width: 100%">
    <!-- 检索条件一排显示 -->
    <el-row :gutter="20" style="width: 100%">
      <el-col :span="3">
        <el-input
          :suffix-icon="Search"
          v-model="keyword"
          placeholder="关键字搜索"
        ></el-input>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="selectedOption"
          placeholder="下拉框条件选择"
          style="width: 200px"
        >
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="15"> </el-col>
      <el-col :span="2">
        <el-button
          style="text-align: right"
          type="primary"
          icon="el-icon-download"
          @click="dataSearch"
          >数据查询</el-button
        >
      </el-col>
    </el-row>
    <!--Excel表格导出-->>
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 --> 
      <el-table-column prop="wxID" label="微信ID"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="applyDate" label="申请时间"></el-table-column>
      <el-table-column prop="applyStatus" label="账号状态"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <el-button type="success" plain @click="handleRowClick(scope.row)">查看详情</el-button>
          <el-dialog v-model="dialogFormVisible" title="维修记录">
          <PermissionAllocate :message="parentMessage"/>
        </el-dialog>
        </template>
      </el-table-column>
      <!-- 其他表格列... -->
    </el-table>
  </div>
</template>
      
  <script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton, FormProps } from "element-plus";
import XLSX from "xlsx";
import { useRouter } from "vue-router";
import axios from "axios";
import { ta } from "element-plus/es/locale";
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import PermissionAllocate from "../components/PermissionAllocate"
const labelPosition = ref<FormProps["labelPosition"]>("right");
//权限分配
const dialogFormVisible = ref(false);
const tableData = ref([]);
const keyword = ref("");
const selectedOption = ref("");
const options = ref([
  { label: "已审核", value: "已审核" },
  { label: "未审核", value: "未审核" },
  // 其他选项...
]);
var parentMessage = {};
const handleRowClick = (row: any) =>{
  parentMessage = "完蛋"
  console.log('row',row)
  dialogFormVisible.value = true

}
//查询条件
const dataSearch = () => {
    const searchData = { keyword: keyword.value, selectedOption: selectedOption.value}
    axiosServer.AxiosPost(searchData,'/users/UserPermissionSearch').then(res=>{
      tableData.value = res
    })
};
const dataAdd= () => {
  const data = [
    {
      nickName: "John",
      realName: "John Doe",
      permission: null, // 这里可以是 'admin'，'user'，或其他您定义的权限
      wxID: "wxuser123",
      applyDate: new Date(),
      applyStatus: "pending",
    },
    {
      nickName: "xia",
      realName: "ffff Doe",
      permission: null, // 这里可以是 'admin'，'user'，或其他您定义的权限
      wxID: "wxuser123",
      applyDate: new Date(),
      applyStatus: "pending",
    },
  ];
}
</script>
  