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
            <el-table-column prop="modelApplyName" label="申请方"></el-table-column>
            <el-table-column prop="modelApplyTime" label="申请时间"></el-table-column>
            <el-table-column prop="modelUsedName" label="使用用户"></el-table-column>
            <el-table-column prop="modelUsedFunction" label="样机用途"></el-table-column>
            <el-table-column prop="modelName" label="设备名称"></el-table-column>
            <el-table-column prop="modelModule" label="模块信息" :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="modelArrivalTime" label="期望发货时间"></el-table-column>
            <el-table-column prop="modelArrivalLocation" label="期望发货地址"></el-table-column>
            <el-table-column prop="modelApplyStatus" label="状态"></el-table-column>
            <el-table-column prop="modelApplyOperation" label="操作">
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
import axios from "axios";
import { useRouter } from "vue-router";
import dayjs from "dayjs"
//数据
const tableData = ref([]);
const keyword = ref("");
const startDate = ref(new Date());
const endDate = ref(new Date());

//事件


//通信
const dataSearch = () => {//查询条件
  const searchData = { keyword: keyword.value, startDate: startDate.value, endDate: endDate.value }
  axios({
    url: "/Model/ModelApplySearch",
    data: searchData,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    if (res.status == 200) {
      //确认保存后，即使清空
      console.log('返回数据：', res.data)
      console.log(res.data)
      tableData.value = res.data.map(item => {
        item.modelApplyTime = new Date(item.modelApplyTime).toLocaleString('zh-CN', {
          hour12: false
        });

        item.modelArrivalTime = new Date(item.modelArrivalTime).toLocaleString('zh-CN', {
          hour12: false
        });

        return item;
      });
    }
  });
}
const router = useRouter();

const handleRowClick = (row: any) => {//表格跳转
  // 处理按钮点击事件，跳转到其他页面
  //点击的向服务端发送请求拿到数据之后跳转
  router.push({
    path: '/MTapplyAddL',
    query: {
      modelApplyName: row.modelApplyName, modelUsedName: row.modelUsedName,
      modelUsedFunction: row.modelUsedFunction, modelName: row.modelName,
      modelModule: row.modelModule, modelArrivalTime: row.modelArrivalTime,
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
