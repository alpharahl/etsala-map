import Vue from 'vue'
import VueRouter from 'vue-router'
import JitaRoute from "@/views/JitaRoute";
import Region from "@/views/Region";
import Reports from "@/views/Reports";
import UploadSystems from "@/views/UploadSystems";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: JitaRoute
  },
  {
    path: '/region/:name',
    name: 'Region',
    props: true,
    component: Region
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/admin',
    name: 'Admin',
    component: UploadSystems
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
