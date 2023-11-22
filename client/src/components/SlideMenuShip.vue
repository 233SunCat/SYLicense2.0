<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    background-color="#f3f5f6" style="height: 100%;">
    <el-sub-menu :index="item.key + ''" v-for="item in menus" :key="item.key" style="width: auto;">
      <template #title>
        <span>{{ item.key }}</span>
      </template>
      <el-menu-item style="padding: 10px; " :index="item.key + subItem.clientName + ''" v-for="subItem in item.items"
        :key="subItem.clientName" @click="handleMenuItemClick(subItem)">
        <template #title>
          <span>{{ subItem.clientName }}</span>
          <!-- <el-tag style="margin: 3px">待发</el-tag> -->
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
  
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import axios from "axios";
import { ref, reactive, provide, inject, onMounted } from 'vue';
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server.js'
import { result } from 'lodash';

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
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

//get axios data
// axios.get('/')
//     .then(response => {
//         console.log(response)
//         menus = response.data;
//     })
//     .catch(error => {
//         console.error(error)
//     })
const shuzu = reactive({ title: '123' })
const handleMenuItemClick = (menuItem: any) => {
  //emit('add', shuzu)
  // 这里处理菜单项的点击事件  
  console.log("点击了菜单项：", menuItem);
  EventBus.emit("slide-ship", { clientName: menuItem.clientName, orderDate: menuItem.orderDate, shipEquipmentId: menuItem.equipmentId ,orderStatus:menuItem.orderStatus});
}


//通信-page-slide
onMounted(() => {
  const handleMessage = (message: string) => {
    console.log('加载输出数据', message)

  };
  //EventBus.on('message', handleMessage); 
})

const fenlei = (data) => {

  type Item = {
    clientName: string;
    orderDate: string;
    equipmentId: string;
  };

  type Entry = {
    key: string;
    items: Item[];
  };

  type MergedData = Entry[];

  const originalData: MergedData = data

  // Function to merge items with the same clientName and orderDate
  const mergeItems = (items: Item[]): Item[] => {
    const mergedItems: Record<string, string[]> = {};

    items.forEach((item) => {
      const year = item.orderDate;
      const itemKey = `${item.clientName}-${year}`;

      if (mergedItems[itemKey]) {
        mergedItems[itemKey].push(item.equipmentId);
      } else {
        mergedItems[itemKey] = [item.equipmentId];
      }
    });

    return Object.entries(mergedItems).map(([key, equipmentIds]) => {
      const [clientName, year] = key.split("-");
      return { clientName, orderDate: year, equipmentId: equipmentIds.join(", ") };
    });
  };

  // Merge items for each entry
  const mergedData: MergedData = originalData.map((entry) => ({
    key: entry.key,
    items: mergeItems(entry.items),
  }));

  console.log(JSON.stringify(mergedData, null, 2));


  console.log(mergedData)
  return mergedData
}

//侧边栏加载
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
  return groupedCollection
}
const ShipMenuSlide = () => {//返回时间，用户
  axiosServer.AxiosGet('/ShipClient').then(collection => {
    const data = YearMonTurn(collection)
    console.log('fenlei',data)
    menus.value = fenlei(data)

  })
  //const data = [{id:1 ,name:'2023年9月',children:[{id:1,name:'大同市第三人民医院',status:'待发'},{id:2,name:'苏北人民医院',status:'待发'}]},{id:2,name:'2023年08月'},{id:3,name:'2023年07月'}]
  //return data
}
//添加设备
//menus.value = ShipMenuSlide()
ShipMenuSlide()
</script>
  