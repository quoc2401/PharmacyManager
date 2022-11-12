import React, { FC, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useStore } from '../../store'
import { homeRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Header from './Header'

const ClientLayout: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const [isOpenedSideBar, setIsOpenedSideBar] = useState(false)

  const items = [
    {
      icon: 'pi pi-home',
      name: 'Home',
      path: '/'
    },
    {
      icon: 'pi pi-shopping-cart',
      name: 'Order cart',
      path: '/order-cart'
    },
    {
      icon: 'pi pi-money-bill',
      name: 'Sales Today',
      path: '/sales-today'
    }
  ]

  if (currentUser && currentUser?.user_role === 'ADMIN')
    return <Navigate to={`/admin`} replace />

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
        className={`flex flex-col min-h-screen justify-between transition-all transition-duration-200 pt-[6.2rem] md:pr-[1.5rem] md:pb-[1rem] md:pl-[3.2rem] ${
          isOpenedSideBar ? 'lg:ml-[300px]' : 'ml-0 md:!pl-[1.5rem]'
        }`}
      >
        <div style={{ flex: '1 1 auto' }}>
          <Routes>
            {homeRoute.map(route => {
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

export default ClientLayout
