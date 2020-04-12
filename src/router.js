import Vue from 'vue'
import VueRouter from 'vue-router'
import CategoryList from '@/views/CategoryList.vue'
import CategoryCreate from '@/views/CategoryCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'category-list',
    component: CategoryList
  },
  {
    path: '/category/create',
    name: 'category-create',
    component: CategoryCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
