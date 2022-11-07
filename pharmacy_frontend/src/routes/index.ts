import Home from '../views/Home/Home'
import MedicineDetail from '../views/Home/MedicineDetail'
import Dashboard from '../views/Admin/Dashboard'
import ManageUser from '../views/Admin/ManageUser'
import ManageMedicine from '../views/Admin/ManageMedicine'
import ManageCategory from '../views/Admin/ManageCategory'

export const homeRoute = [
  {
    path: '',
    component: Home
  },
  {
    path: '/medicine-details/:name/:id',
    component: MedicineDetail
  },
  {
    path: '/order-cart',
    component: MedicineDetail
  },
  {
    path: '/order-details/:id',
    component: MedicineDetail
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
    component: ManageCategory
  },
  {
    path: '/manage/medicines',
    component: ManageMedicine
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
