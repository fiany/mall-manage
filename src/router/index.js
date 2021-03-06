import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import ProductList from '../components/product/ProductList.vue'
import CategoryList from '../components/product/CategoryList.vue'
import BrandList from '../components/product/BrandList.vue'
import UserList from '../components/user/UserList.vue'
import OrderList from '@/components/order/OrderList'
import PermissionManage from '@/components/permission/PermissionManage'
import RoleManage from '@/components/permission/RoleManage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/product/list',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: '/category/list',
        name: 'CategoryList',
        component: CategoryList
      },
      {
        path: '/brand/list',
        name: 'BrandList',
        component: BrandList
      },
      {
        path: '/user/list',
        name: 'UserList',
        component: UserList
      },
      {
        path: '/order/list',
        name: 'OrderList',
        component: OrderList
      },
      {
        path: '/role/manage',
        name: 'RoleManage',
        component: RoleManage
      },
      {
        path: '/permission/manage',
        name: 'PermissionManage',
        component: PermissionManage
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/login')
  next()
})

export default router
