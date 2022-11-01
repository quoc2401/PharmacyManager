import React, { FC, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useStore } from '../../store'
import { adminRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const items = [
  {
    icon: 'pi pi-chart-line',
    name: 'Dashboard',
    path: '/admin'
  },
  {
    icon: 'pi pi-user',
    name: 'Users',
    path: '/admin/manage/users'
  },
  {
    icon: 'pi pi-list',
    name: 'Categories',
    path: '/admin/manage/categories'
  },
  {
    icon: 'pi pi-eraser',
    name: 'Medicines',
    path: '/admin/manage/medicines'
  },
  {
    icon: 'pi pi-file-edit',
    name: 'Orders',
    path: '/admin/manage/orders'
  }
]


const AdminLayout: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const [isOpenedSideBar, setIsOpenedSideBar] = useState(false)

  if (currentUser && currentUser?.user_role === 'EMPLOYEE')
    return <Navigate to={`/`} replace />

  return (
    <div>
      <Header
        setOpenedSideBar={setIsOpenedSideBar}
        openedSideBar={isOpenedSideBar}
      />

      <Sidebar
        openedSideBar={isOpenedSideBar}
        setOpenedSideBar={setIsOpenedSideBar}
        items={items}
      />

      <div
        className={`flex flex-col min-h-screen justify-between transition-all transition-duration-200 ${
          isOpenedSideBar ? 'ml-[300px]' : 'ml-0 !pl-[1.5rem]'
        }`}
        style={{ padding: '6.2rem 1.5rem 1rem 3.2rem' }}
      >
        <div style={{ flex: '1 1 auto' }}>
          <Routes>
            {adminRoute.map(route => {
              const Page = route.component
              return (
                <Route key={route.path} path={route.path} element={<Page />} />
              )
            })}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout
