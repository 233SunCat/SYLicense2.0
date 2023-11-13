import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForceFeedback from '../views/ForceFeedback.vue'
import UserAdd from '../views/UserAdd.vue'
import EquipmentSubmit from '../views/EquipmentSubmit.vue'
import EquipmentSearch from '../views/EquipmentSearch.vue'
import ModelAdd from '../views/ModelAdd.vue'
import ModelApply from '../views/ModelApply.vue'
import EquipmentDetail from '../views/EquipmentDetail.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ModelApply
  },
  {
    path: '/UserAdd',
    name: 'UserAdd',
    component: UserAdd
  },
  {
    path: '/ForceFeedback',
    name: 'ForceFeedback',
    component: ForceFeedback
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
    path: '/ModelApply',
    name: 'ModelApply',
    component: ModelApply
  },
  {
    path: '/Equipment/EquipmentDetail',
    name: 'EquipmentDetail',
    component: EquipmentDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
