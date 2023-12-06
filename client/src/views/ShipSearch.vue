<template>
  <div style="width: 100%;">
    <el-input style="width:30%" :suffix-icon="Search" v-model="keyword" placeholder="关键字搜索"></el-input>
    <div>
      <el-checkbox v-model="userCheckAll" @change="handleCheckAllChange0(userCheckAll)">全选</el-checkbox>
      <el-checkbox-group v-model="formInline.userItems">
        <el-checkbox v-for="item in userItems" :key="item" :label="item" :disabled="item === '用户名称'">
          {{ item }}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox v-model="equipmentCheckAll" @change="handleCheckAllChange1(equipmentCheckAll)">全选</el-checkbox>
      <el-checkbox-group v-model="formInline.equipmentItems">
        <el-checkbox v-for="item in equipmentItems" :key="item" :label="item"
          :disabled="item === '设备名称' || item === '设备型号'">
          {{ item }}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox v-model="contractsCheckAll" @change="handleCheckAllChange2(contractsCheckAll)">全选</el-checkbox>
      <el-checkbox-group v-model="formInline.contractsItems">
        <el-checkbox v-for="item in contractsItems" :key="item" :label="item">
          {{ item }}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox v-model="invoiceCheckAll" @change="handleCheckAllChange3(invoiceCheckAll)">全选</el-checkbox>
      <el-checkbox-group v-model="formInline.invoiceItems">
        <el-checkbox v-for="item in invoiceItems" :key="item" :label="item">
          {{ item }}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox v-model="emailCheckAll" @change="handleCheckAllChange4(emailCheckAll)">全选</el-checkbox>
      <el-checkbox-group v-model="formInline.emailItems">
        <el-checkbox v-for="item in emailItems" :key="item" :label="item">
          {{ item }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="common-layout" style="height: 100%;margin-top: 30px;">
      <el-container style="height: 100%;">
        <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
          <el-text class="mx-1" size="large">发货明细表</el-text>
        </el-header>
        <el-main style="background-color: #ffffff;">
          <!-- 检索条件一排显示 -->
          <div style="width: 100%">
            <!-- 检索条件一排显示 -->
            <div style="width: 100%;">
              <el-date-picker style="margin-left: 20px;" v-model="startDate" type="date" placeholder="选择起始日期">
              </el-date-picker>
              <el-date-picker style="margin-left: 20px;" v-model="endDate" type="date" placeholder="选择结束日期">
              </el-date-picker>
              <el-button style="float: right;margin: 20px;" type="primary" icon="el-icon-download"
                @click="onSubmit">数据查询</el-button>
              <ExportExcel :id="'exportTab'" :name="'导出Table'"></ExportExcel>
            </div>
          </div>
          <!--Excel表格导出-->
          <div>
            <el-table :data="tableData" id="exportTab" sum-text="统计">
              <!-- 表格列定义 -->
              <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
              <el-table-column prop="clientName" label="客户名称"></el-table-column>
              <el-table-column prop="orderStatus" label="中标状态"></el-table-column>
              <el-table-column prop="orderDate" label="订单时间" width="160px"></el-table-column>
              <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
              <el-table-column prop="equipmentId" label="设备编号"></el-table-column>
              <el-table-column prop="equipmentStyle" label="设备型号"></el-table-column>
              <el-table-column prop="clientArea" label="客户所属地区"></el-table-column>
              <el-table-column prop="clientProvince" label="客户所属省份"></el-table-column>
              <el-table-column prop="clientUrban" label="客户所属市区"></el-table-column>
                <!-- <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #default>
                            <div>{{ scope.row.equipmentModule}}</div>
                        </template>
                        <template #reference>
                            <el-tag>模块信息</el-tag>
                        </template>
                    </el-popover>
                </template> -->
              <el-table-column prop="equipmentModule" label="模块信息" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="equipmentNetwork" label="是否联网"></el-table-column>
              <el-table-column prop="protectTime" label="质保期"></el-table-column>
              <el-table-column prop="receivingName" label="收货人姓名"></el-table-column>
              <el-table-column prop="receivingPhone" label="收货人手机号"></el-table-column>
              <el-table-column prop="receivingCity" label="收货地址"></el-table-column>
              <el-table-column prop="receivingCompany" label="收货机构"></el-table-column>
              <el-table-column prop="receivingCity_q" label="详细收货地址"></el-table-column>
              <el-table-column prop="receivingDate" label="期望到货时间" width="160px"></el-table-column>
              <el-table-column prop="emailName" label="发货人姓名"></el-table-column>
              <el-table-column prop="emailPhone" label="发货人手机号"></el-table-column>
              <el-table-column prop="emailCity" label="发货城市"></el-table-column>
              <el-table-column prop="emailCompany" label="发货机构"></el-table-column>
              <el-table-column prop="emailCity_q" label="详细发货地址"></el-table-column>
              <el-table-column prop="emailDate" label="发货时间" width="160px"></el-table-column>
              <el-table-column prop="shippingCost" label="物流费用"></el-table-column>
              <el-table-column prop="paymentMethod" label="支付方式"></el-table-column>
              <el-table-column prop="signforName" label="签收人姓名"></el-table-column>
              <el-table-column prop="signforPhone" label="签收人手机号"></el-table-column>
              <el-table-column prop="signforDate" label="签收日期" width="160px"></el-table-column>
              <el-table-column prop="inventoryStatus" label="是否在库"></el-table-column>
              <el-table-column prop="acceptName" label="验收方姓名"></el-table-column>
              <el-table-column prop="acceptPhone" label="验收方手机号"></el-table-column>
              <el-table-column prop="acceptDate" label="验收日期" width="160px"></el-table-column>
              <el-table-column prop="dealer" label="代理商信息"></el-table-column>
              <el-table-column prop="contractSignDate" label="合同签订日期" width="160px"></el-table-column>
              <el-table-column prop="contractMoney" label="合同签订金额"></el-table-column>
              <el-table-column prop="paymentDate" label="付款日期" width="160px"></el-table-column>
              <el-table-column prop="paymentMethod" label="付款方式"></el-table-column>
              <el-table-column prop="winningBidPrice" label="中标价格"></el-table-column>
              <el-table-column prop="serviceFee" label="服务费"></el-table-column>
              <el-table-column prop="invoiceStatus" label="开票情况"></el-table-column>
              <el-table-column prop="invoiceDate" label="开票日期" width="160px"></el-table-column>
              <el-table-column prop="invoiceNumber" label="开票编号"></el-table-column>
            </el-table>
          </div>
          <div>
            <el-row>
              <el-col :span="4">
                <el-statistic title="出售设备总数" :value="equipmentCount" />
              </el-col>
              <el-col :span="4">
                <el-statistic title="总销售额(合同签订)" :value="sumMoney" />
              </el-col>
              <el-col :span="4">
                <el-statistic title="总服务费" :value="sumServiceFee" />
              </el-col>
              <el-col :span="4" v-for="item, key in equipmentStyleCount" :key="key">
                <el-statistic :title='key' :value="item" />
              </el-col>

            </el-row>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import XLSX from "xlsx";
import ExportExcel from "@/components/ExportExcel.vue";

// 定义数据
var tableData = ref(null)
var equipmentCount = ref(0)
var equipmentStyleCount = ref({})
var sumMoney = ref(0)
var sumServiceFee = ref(0)
const startDate = ref(new Date());
startDate.value.setMonth(startDate.value.getMonth() - 1);
const endDate = ref(new Date());
//勾选框
const userItems = ['用户名称', '订单状态', '订单时间','客户所属地区','客户所属省份','客户所属市区']
const equipmentItems = ['设备名称', '设备型号', '模块信息', '是否联网', '质保期']
const contractsItems = ['代理商信息', '合同签订日期', '合同签订金额', '中标价格', '付款日期', '服务费']
const invoiceItems = ['开票情况', '开票日期', '开票编号']
const emailItems = ['发货时间', "验收日期"]

const formInline = reactive({//这里就是获取的数据
  userItems: ['用户名称'],
  equipmentItems: ['设备名称', '设备型号'],
  contractsItems: [],
  invoiceItems: [],
  emailItems: [],
})
const keyword = ref('')
//默认勾选框全选关闭
const userCheckAll = ref(false)
const equipmentCheckAll = ref(false)
const contractsCheckAll = ref(false)
const invoiceCheckAll = ref(false)
const emailCheckAll = ref(false)


//勾选框全选
const handleCheckAllChange0 = (val: boolean) => {
  formInline.userItems = val ? userItems : ['用户名称']
}
const handleCheckAllChange1 = (val: boolean) => {
  formInline.equipmentItems = val ? equipmentItems : ['设备名称', '设备型号']
}
const handleCheckAllChange2 = (val: boolean) => {
  formInline.contractsItems = val ? contractsItems : []
}
const handleCheckAllChange3 = (val: boolean) => {
  formInline.invoiceItems = val ? invoiceItems : []
}
const handleCheckAllChange4 = (val: boolean) => {
  formInline.emailItems = val ? emailItems : []
}
//翻页


//查询条件
const onSubmit = () => {

  const val = { startDate: startDate.value, endDate: endDate.value, keyword: keyword.value, formInline: formInline }
  axiosServer.AxiosPost(qs.stringify(val), '/ShipClient/GetShipSearch').then(res => {
    console.log('输出用户表格',res)
    equipmentCount.value = res.filter(item => item.equipmentId != '').length;
    // 使用 reduce 函数对 equipmentStyle 进行分类统计
    const styleCount: Record<string, number> = res.reduce((acc, item) => {
      const style = item.equipmentStyle;
      if (style !== '') {
        acc[style] = (acc[style] || 0) + 1;
      }
      return acc;
    }, {});
    // 使用 reduce 方法对 contractMoney 字段进行相加
    const totalContractMoney: number = res.reduce((sum, item) => {
      const contractMoney = parseFloat(item.contractMoney) || 0; // 将字符串转换为数字，如果无法转换则为 0
      return sum + contractMoney;
    }, 0);
    const totalServiceFee: number = res.reduce((sum, item) => {
      const serviceFee = parseFloat(item.serviceFee) || 0; // 将字符串转换为数字，如果无法转换则为 0
      return sum + serviceFee;
    }, 0);
    equipmentStyleCount.value = styleCount
    sumMoney.value = totalContractMoney
    sumServiceFee.value = totalServiceFee
    tableData.value = res.map(item => {
      item.orderDate = item.orderDate ? new Date(item.orderDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.receivingDate = item.receivingDate ? new Date(item.receivingDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.emailDate = item.emailDate ? new Date(item.emailDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.signforDate = item.signforDate ? new Date(item.signforDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.acceptDate = item.acceptDate ? new Date(item.acceptDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.contractSignDate = item.contractSignDate ? new Date(item.contractSignDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.paymentDate = item.paymentDate ? new Date(item.paymentDate).toLocaleString('zh-CN', { hour12: false }) : null;
      item.invoiceDate = item.invoiceDate ? new Date(item.invoiceDate).toLocaleString('zh-CN', { hour12: false }) : null;
      return item;
    });
  })
}
</script>
