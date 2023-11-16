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
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 -->
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column prop="applyName" label="申请方"></el-table-column>
      <el-table-column prop="applyDate" label="申请时间"></el-table-column>
      <el-table-column prop="usedName" label="使用用户"></el-table-column>
      <el-table-column prop="equipmentFunction" label="样机用途"></el-table-column>
      <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
      <el-table-column prop="moduleMessage" label="模块信息"></el-table-column>
      <el-table-column prop="arrivalTime" label="期望发货时间"></el-table-column>
      <el-table-column prop="arrivalLocation" label="期望发货地址"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <!-- 按钮，点击后跳转到其他页面 -->
          <!-- <router-link style="  text-decoration: none;" to="/Equipment/EquipmentDetail">
            <el-button type="success" plain @click="handleRowClick(scope.row)">查看详情</el-button>
            </router-link> -->
          <el-button type="success" plain @click="handleRowClick(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>      <!-- 其他表格列... -->
    </el-table>
  </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from "axios";
const input = ref('')
const tableData = ref([]);


//事件


//通信
//查询条件
const dataSearch = () => {
  const searchData = { }
  axios({
    url: "/Equipment/EquipmentSearch",
    data: searchData,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    if (res.status == 200) {
      //确认保存后，即使清空
      tableData.value = res.data.map(item => {
        item.faultDate = new Date(item.faultDate).toLocaleDateString();
        return item;
      });
    }
  });
}
const handleRowClick = (row: any) => {//表格跳转
  // 处理按钮点击事件，跳转到其他页面
  console.log("输出跳转页面事件");
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
      // router.push({
      //   path: '/Equipment/EquipmentDetail',
      //   query: { faultDate: data.faultDate, faultPhenomenon: data.faultPhenomenon, notes: data.notes , equipmentId: row.equipmentId}
      //   // 多个参数这样的写法
      //   // query:{Shuju}
      // })
    }
  });
};

</script>
//

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
