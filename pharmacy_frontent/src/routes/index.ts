import Home from "../views/Home/Home";
import Detail from "../views/Home/Detail";
import Dashboard from "../views/Admin/Dashboard";
import Manage from "../views/Admin/Manage";

export const homeRoute = [
  {
    path: '',
    component: Home
  },
  {
    path: '/details/:id',
    component: Detail
  }
]

export const adminRoute = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: '/manage/:category',
    component: Manage
  }
]