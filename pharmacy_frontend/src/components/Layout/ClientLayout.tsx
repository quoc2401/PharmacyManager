import React, { FC, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useStore } from '../../store'
import { homeRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Footer from './Footer'
import Header from './Header'
import { Sidebar } from 'primereact/sidebar'

const ClientLayout: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const [isOpenedSideBar, setIsOpenedSideBar] = useState(false)

  if (currentUser && currentUser?.user_role === 'ADMIN')
    return <Navigate to={`/admin`} replace />

  return (
    <div>
      <Header openSideBar={setIsOpenedSideBar} />

      <Sidebar
        visible={isOpenedSideBar}
        onHide={() => setIsOpenedSideBar(false)}
      >
        <h3>Sidebar</h3>
      </Sidebar>

      <Routes>
        {homeRoute.map(route => {
          const Page = route.component
          return <Route key={route.path} path={route.path} element={<Page />} />
        })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default ClientLayout
