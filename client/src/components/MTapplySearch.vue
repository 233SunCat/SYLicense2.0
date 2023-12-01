<template>
  <div class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
        <el-text class="mx-1" size="large">样机流转记录</el-text>
      </el-header>
      <el-main style="background-color: #ffffff;">
        <div style="width: 100%">
          <!-- 检索条件一排显示 -->
          <div style="width: 100%;"> <el-input style="width: 10%;" :suffix-icon="Search" v-model="keyword"
              placeholder="关键字搜索"></el-input>
            <el-date-picker style="margin-left: 20px;" v-model="startDate" type="date" placeholder="选择起始日期">
            </el-date-picker>
            <el-date-picker style="margin-left: 20px;" v-model="endDate" type="date" placeholder="选择结束日期">
            </el-date-picker>
            <el-button style="float: right;" type="primary" icon="el-icon-download" @click="dataSearch">数据查询</el-button>
          </div>
          <!--Excel表格导出-->>
          <el-table :data="tableData" style="width: 100%">
            <!-- 表格列定义 -->
            <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
            <el-table-column prop="applyNameApply" label="申请方"></el-table-column>
            <el-table-column prop="applyDateApply" label="申请时间"></el-table-column>
            <el-table-column prop="usedNameApply" label="使用用户"></el-table-column>
            <el-table-column prop="usedFunctionApply" label="样机用途"></el-table-column>
            <el-table-column prop="modelNameApply" label="设备名称"></el-table-column>
            <el-table-column prop="modelModuleApply" label="模块信息" :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="arrivalDateApply" label="期望发货时间"></el-table-column>
            <el-table-column prop="arrivalLocationApply" label="期望发货地址"></el-table-column>
            <el-table-column prop="applyStatusApply" label="状态"></el-table-column>
            <el-table-column prop="operation" label="操作">
              <template #default="scope">
                <!-- 按钮，点击后跳转到其他页面 -->
                <el-button type="success" plain @click="handleRowClick(scope.row)">去发货</el-button>
              </template>
            </el-table-column> <!-- 其他表格列... -->
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router";
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import dayjs from 'dayjs'

import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults';
const tableData = ref([]);
const keyword = ref("");
const startDate = ref(new Date());
const endDate = ref(new Date());
const router = useRouter();

const dataSearch = async() => {//查询条件
  const searchData = { keyword: keyword.value, startDate: startDate.value, endDate: endDate.value }
  const result =  await axiosServer.AxiosPost(qs.stringify(searchData), '/Model/ModelApplySearch')
  console.log('result',result)
  tableData.value = result.map(item => {
        item.applyDateApply = dayjs(item.applyDateApply).format("YYYY-MM-DD hh:mm:ss")
        item.arrivalDateApply = dayjs(item.arrivalDateApply).format("YYYY-MM-DD hh:mm:ss")
        return item;
      });

}
const handleRowClick = (row: any) => {//表格跳转
  // 处理按钮点击事件，跳转到其他页面
  //点击的向服务端发送请求拿到数据之后跳转
  router.push({
    path: '/MTapply/MTShip',
    query: {
      applyNameApply: row.applyNameApply, usedNameApply: row.usedNameApply,
      usedFunctionApply: row.usedFunctionApply, modelNameApply: row.modelNameApply,
      modelModuleApply: row.modelModuleApply, arrivalDateApply: row.arrivalDateApply,
      applyDateApply:row.applyDateApply
    }
    // 多个参数这样的写法
    // query:{Shuju}
  })
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
