import Home from '../views/Home/Home'
import Detail from '../views/Home/Detail'
import Dashboard from '../views/Admin/Dashboard'
import ManageUser from '../views/Admin/ManageUser'

export const homeRoute = [
  {
    path: '',
    component: Home
  },
  {
    path: '/medicine/:name/:id',
    component: Detail
  },
  {
    path: '/order-cart',
    component: Detail
  },
  {
    path: '/order-details/:id',
    component: Detail
  }
]

export const adminRoute = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: '/manage/users',
    component: ManageUser
  },
  {
    path: '/manage/categories',
    component: ManageUser
  },
  {
    path: '/manage/medicines',
    component: ManageUser
  },
  {
    path: '/manage/orders',
    component: ManageUser
  },
  {
    path: '/manage/order-details',
    component: ManageUser
  }
]
