<template>
  <div>
    <el-form :model="form" :inline="false" class="demo-form-inline" :label-position="labelPosition" label-width="120px">
      <el-form-item label="技能训练"></el-form-item>
      <el-form-item label="模块选择：">
        <el-checkbox v-model="checkAll0" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities0" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities0" :key="city" :label="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数量配置：">
        <el-select v-model="selectedOption" placeholder="下拉框条件选择" size="mini">
          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-input-number v-model="num0" :min="1" :max="99" />
      </el-form-item>
      <el-form-item label="缝合打结训练"></el-form-item>
      <el-form-item label="模块选择：">
        <el-checkbox v-model="checkAll1" :indeterminate="isIndeterminate">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities1">
          <el-checkbox v-for="city in cities1" :key="city" :label="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数量配置：">
        <el-select v-model="selectedOption" placeholder="下拉框条件选择" size="mini">
          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-input-number v-model="num1" :min="1" :max="99" />
      </el-form-item>
      <el-form-item label="手术训练"></el-form-item>
      <el-form-item label="模块选择：">
        <el-checkbox v-model="checkAll2" :indeterminate="isIndeterminate">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities2">
          <el-checkbox v-for="city in cities2" :key="city" :label="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数量配置：">
        <el-select v-model="selectedOption" placeholder="下拉框条件选择" size="mini">
          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
        <el-input-number v-model="num2" :min="1" :max="99"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, inject } from "vue";
import type { FormProps } from "element-plus";
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";

const route = useRoute();
const labelPosition = ref<FormProps["labelPosition"]>("right");
const equipmentId = ref(route.query.equipmentId)
// 其他表格数据...
const form = reactive({
  equipmentId: equipmentId,
  repairEngineer: '',
  repairTime: '',
  repairLocation: '',
  repairMoney: '',
  repairContext: '',
  repairNotes: '',
  checked1: false,
  checked2: false
})
const checkAll0 = ref(false)
const checkAll1 = ref(false)
const checkAll2 = ref(false)

const isIndeterminate = ref(true)
const checkedCities0 = ref(['镜头训练', '分离训练'])
const cities0 = ['镜头训练', '分离训练', 'FLS技能训练', '剪切训练', '钛夹训练', '电凝训练', '双手合作训练', '抓取训练']
const checkedCities1 = ref(['缝合训练', '打结训练'])
const cities1 = ['缝合训练', '打结训练']
const checkedCities2 = ref(['胆囊胆道手术', '打结训练'])
const cities2 = ['胆囊胆道手术', '打结训练', '妇科手术', '阑尾切除手术', '乙状结肠切除手术']

const selectedOption = ref("");
const options = ref([
  { label: "不限制", value: "不限制" },
  // 其他选项...
]);
const num0 = ref(1)//数量配置
const num1 = ref(1)//数量配置
const num2 = ref(1)//数量配置

//获取所有选择，点击申请
const onSubmit = () =>{
  checkedCities0
  num0
}

const handleCheckAllChange = (val: boolean) => {
  checkedCities0.value = val ? cities0 : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll0.value = checkedCount === cities0.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities0.length
}
</script>