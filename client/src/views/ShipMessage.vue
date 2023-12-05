<template>
  <div class="common-layout" style="height: 100%;width: 100%;margin-top: -20px;margin-left: -20px;">
    <el-container style="height: 100%; background-color: #f0f3f4;">
      <el-aside width="200px" style="height: 100%;">
        <el-menu default-active="null" class="el-menu-vertical-demo" background-color="#f3f5f6" style="height: 100%;">
          <el-sub-menu :index="item.key + ''" v-for="item in menus" :key="item.key" style="width: auto;">
            <template #title>
              <el-icon>
                <Calendar />
              </el-icon>
              <span>{{ item.key }}</span>
            </template>
            <el-menu-item style="padding: 10px; " :index="item.key + subItem.clientName + ''"
              v-for="subItem in item.items" :key="subItem.clientName" @click="handleMenuItemClick(subItem)">
              <template #title>
                <span>{{ subItem.clientName }}</span>
                <!-- <el-tag style="margin: 3px">待发</el-tag> -->
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <ShipUserStatus v-if="shipPermission" />
        <ShipConfigureTraining v-if="shipPermission" style="margin-top: 30px;" />
        <ShipNetwork v-if="shipPermission" style="margin-top: 30px;" />
        <ShipReceiving v-if="shipPermission" style="margin-top: 30px;" />
        <ShipEmail v-if="shipPermission" style="margin-top: 30px;" />
        <SignFor v-if="shipPermission" style="margin-top: 30px;" />
        <ShipInspection v-if="shipPermission" style="margin-top: 30px;" />
        <ShipContracts v-if="shipPermission" style="margin-top: 30px;" />
        <ShipEvent v-if="shipPermission" style="margin-top: 30px;" />
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import ShipConfigureTraining from '@/components/ShipConfigureTraining.vue'
import SlideMenuShip from '@/components/SlideMenuShip.vue'
import ShipNetwork from '@/components/ShipNetwork.vue'
import ShipReceiving from '@/components/ShipReceiving.vue'
import ShipEmail from '@/components/ShipEmail.vue'
import SignFor from '@/components/SignFor.vue'
import ShipInspection from '@/components/ShipInspection.vue'
import ShipContracts from '@/components/ShipContracts.vue'
import ShipEvent from '@/components/ShipEvent.vue'
import ShipUserStatus from '@/components/ShipUserStatus.vue'

import { ref, provide, onMounted, reactive, inject, nextTick } from 'vue'
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import {
  Calendar
} from '@element-plus/icons-vue'

var menus = ref();
// 定义分组的类型接口  
interface Group {
  key: string;
  items: Item[];
}
// 定义数据项的类型接口  
interface Item {
  _id: string;
  clientName: string;
  orderStatus: string;
  orderDate: string;
  __v: number;
}

const fenlei = (data) => {
  type Item = {
    clientName: string;
    orderDate: Date;
    equipmentId: string;
    orderStatus: string;
  };

  type Entry = {
    key: string;
    items: Item[];
  };

  type MergedData = Entry[];

  const originalData: MergedData = data;

  const mergeItems = (items: Item[]): Item[] => {
    const mergedItems: Record<string, Item> = {};

    items.forEach((item) => {
      const orderDate = item.orderDate instanceof Date ? item.orderDate : new Date(item.orderDate);
      const year = orderDate.getFullYear();
      const itemKey = `${item.clientName}+${year}`;

      if (!mergedItems[itemKey]) {
        // 使用原始的 orderDate 字段值
        mergedItems[itemKey] = { ...item, orderDate };
      } else {
        mergedItems[itemKey].equipmentId += `, ${item.equipmentId}`;
      }
    });

    return Object.values(mergedItems);
  };

  const mergedData: MergedData = originalData.map((entry) => ({
    key: entry.key,
    items: mergeItems(entry.items),
  }));
  return mergedData;
};



const YearMonTurn = (collection) => {
  // 处理后的数组，以年月为分组标准  
  let groupedCollection: Group[] = [];
  // 假设 collection 是你的 Item 数组  
  for (let i = 0; i < collection.length; i++) {
    let item = collection[i];

    // 将订单日期转换为日期对象    
    let orderDate = new Date(item.orderDate);

    // 提取年份和月份    
    let year = orderDate.getFullYear();
    let month = orderDate.getMonth() + 1; // 注意，月份是从 0 开始的，所以需要加 1    

    // 创建年月分组键    
    let groupKey = year + '-' + month;

    // 检查分组是否已经存在    
    let group = groupedCollection.find((group: Group) => group.key === groupKey);

    if (group) {
      // 如果分组已存在，将当前项添加到该分组中    
      group.items.push(item);
    } else {
      // 如果分组不存在，创建一个新的分组，并将当前项添加到该分组中    
      groupedCollection.push({
        key: groupKey,
        items: [item]
      });
    }
  }
  console.log('groupedCollection', groupedCollection)
  return groupedCollection
}
/**
* 加载侧边栏
*/
const ShipMenuSlide = () => {//返回时间，用户
  axiosServer.AxiosGet('/ShipClient/ShipMenu').then(collection => {
    menus.value = fenlei(YearMonTurn(collection))
  })
}
ShipMenuSlide()
/**
* 侧边栏触发事件
* @param menuItem  
*/
const handleMenuItemClick = async (menuItem: any) => {
  console.log('shipMessage侧边栏触发',menuItem)
  shipPermission.value = true
  await nextTick();
  EventBus.emit("slide-ship", { clientName: menuItem.clientName, orderDate: menuItem.orderDate, equipmentIds: menuItem.equipmentId, orderStatus: menuItem.orderStatus });
  EventBus.emit("slide-ship-order", {
    clientName: menuItem.clientName,
    orderDate: menuItem.orderDate,
    orderStatus: menuItem.orderStatus,
  });


}
const shipPermission = ref(false)
const userPermission = 2

</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>