import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForceFeedback from '../views/ForceFeedback.vue'
import ShipAdd from '../views/ShipAdd.vue'
import EquipmentSubmit from '../views/EquipmentSubmit.vue'
import EquipmentSearch from '../views/EquipmentSearch.vue'
import ModelAdd from '../views/ModelAdd.vue'
import EquipmentDetail from '../views/EquipmentDetail.vue'
import PermissionsApply from '../views/PermissionsApply.vue'
import PermissionsSearch from '../views/PermissionsSearch.vue'
import MTmessage from '../views/MTmessage.vue'
import MTapply from '../views/MTapply.vue'
import ShipMessage from '../views/ShipMessage.vue'
import LoginHome from '../views/LoginHome.vue'
import App from '../App.vue'
import ProductModule from '../views/ProductModule.vue'
import ShipSearch from '../views/ShipSearch.vue'
import MTShip from '../views/MTShip.vue'
import MTShips from '../views/MTShips.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: LoginHome
  },
  {
    path: '/App',
    name: 'App',
    component: App,
    children: [
      {//发货信息
        path: '/ShipMessage',
        name: 'ShipMessage',
        component: ShipMessage
      },
      {
        path: '/ShipAdd',
        name: 'ShipAdd',
        component: ShipAdd,
    
      },
      {
        path: '/Equipment/EquipmentSubmit',
        name: 'EquipmentSubmit',
        component: EquipmentSubmit
      },
      {
        path: '/Equipment/EquipmentSearch',
        name: 'EquipmentSearch',
        component: EquipmentSearch
      },
      {
        path: '/ModelAdd',
        name: 'ModelAdd',
        component: ModelAdd
      },
      {
        path: '/Equipment/EquipmentDetail',
        name: 'EquipmentDetail',
        component: EquipmentDetail
      },
      {
        path: '/PermissionsSearch',
        name: 'PermissionsSearch',
        component: PermissionsSearch
      },
      {
        path: '/MTmessage',
        name: 'MTmessage',
        component: MTmessage
      },
      {
        path: '/MTapply',
        name: 'MTapply',
        component: MTapply
      },
      {
        path: '/ProductModule',
        name: 'ProductModule',
        component: ProductModule
      },
      {
        path: '/ShipSearch',
        name: 'ShipSearch',
        component: ShipSearch
      },
      {
        path: '/MTapply/MTShip',
        name: 'MTShip',
        component: MTShip
      },
      {
        path: '/MTapply/MTShips',
        name: 'MTShips',
        component: MTShips
      },
    ],
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
