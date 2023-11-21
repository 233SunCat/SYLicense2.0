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
      <el-col :span="1"> </el-col>
      <el-col :span="3">
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="选择起始日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="3">
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="选择结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4"> </el-col>
      <el-col :span="2">
        <el-button
          style="text-align: right"
          type="primary"
          icon="el-icon-download"
          @click="dataSearch"
          >数据查询</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button
          style="text-align: right"
          type="primary"
          icon="el-icon-download"
          @click="exportToExcel"
          >数据导出</el-button
        >
      </el-col>
    </el-row>
    <!--Excel表格导出-->>
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 -->
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column
        prop="modelApplyName"
        label="模块训练申请人"
      ></el-table-column>
      <el-table-column prop="applyDate" label="申请时间"></el-table-column>
      <el-table-column prop="wxID" label="微信ID"></el-table-column>
      <el-table-column prop="modelName" label="设备名场"></el-table-column>
      <el-table-column
        prop="cpuSerialNumber"
        label="处理器序列号"
      ></el-table-column>
      <el-table-column
        prop="diskSerialNumber"
        label="硬盘序列号"
      ></el-table-column>
      <el-table-column prop="approvalStatus" label="审核状态"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <!-- 按钮，点击后跳转到其他页面 -->
          <!-- <router-link style="  text-decoration: none;" to="/Equipment/EquipmentDetail">
            <el-button type="success" plain @click="handleRowClick(scope.row)">查看详情</el-button>
            </router-link> -->
          <el-button
            v-if="scope.row.approvalStatus === '通过'"
            type="success"
            plain
            @click="handleDetailsClick(scope.row)"
          >
            查看详情
          </el-button>
          <el-button
            v-else-if="scope.row.approvalStatus === '待审核'"
            type="primary"
            plain
            @click="handleAuditClick(scope.row)"
          >
            审核
          </el-button>
        </template>
      </el-table-column>
      <!-- 其他表格列... -->
    </el-table>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import XLSX from "xlsx";
import { useRouter } from "vue-router";
import axios from "axios";

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
const filterData = () => {
  // 在这里根据关键字、下拉框选项、起始日期和结束日期对数据进行筛选
  // 筛选后的数据存储在tableData中，表格会自动更新显示筛选后的数据
};

var searchData = new FormData();
//查询条件

const router = useRouter();
var uploadData = new FormData();
//表格跳转
const handleRowClick = (row: any) => {
  // 处理按钮点击事件，跳转到其他页面
  console.log("输出跳转页面事件");
  uploadData.append("equipmentId", row.equipmentId);
  //点击的向服务端发送请求拿到数据之后跳转
  axios({
    url: "/Equipment/EquipmentDetail",
    data: { equipmentId: row.equipmentId },
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    if (res.status != 500 && res.data) {
      const data = res.data[0];
      router.push({
        path: "/Equipment/EquipmentDetail",
        query: {
          faultDate: data.faultDate,
          faultPhenomenon: data.faultPhenomenon,
          notes: data.notes,
          equipmentId: row.equipmentId,
        },
        // 多个参数这样的写法
        // query:{Shuju}
      });
    }
  });
};
//通信
const dataSearch = () => {
  // const searchData = { keyword: keyword.value, selectedOption: selectedOption.value, startDate: startDate.value, endDate: endDate.value }
  // axios({
  //   url: "/Equipment/EquipmentSearch",
  //   data: searchData,
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  // }).then((res) => {
  //   if (res.status == 200) {
  //     //确认保存后，即使清空
  //     tableData.value = res.data.map(item => {
  //       item.faultDate = new Date(item.faultDate).toLocaleDateString();
  //       return item;
  //     });
  //   }
  // });
  const data = [
    {
      modelApplyName: "John Doe",
      applyDate: "2023-11-21",
      wxID: "john_doe123",
      modelName: "ProductX",
      cpuSerialNumber: "ABC123",
      diskSerialNumber: "XYZ789",
      approvalStatus: "通过",
      operation: "View Details",
    },
    {
      modelApplyName: "Jane Smith",
      applyDate: "2023-11-22",
      wxID: "jane_smith456",
      modelName: "ProductY",
      cpuSerialNumber: "DEF456",
      diskSerialNumber: "UVW987",
      approvalStatus: "待审核",
      operation: "Edit",
    },
    {
      modelApplyName: "Bob Johnson",
      applyDate: "2023-11-23",
      wxID: "bob_johnson789",
      modelName: "ProductZ",
      cpuSerialNumber: "GHI789",
      diskSerialNumber: "LMN654",
      approvalStatus: "待审核",
      operation: "Delete",
    },
  ];
  tableData.value = data;
};
</script>
