import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useStore } from '../../store'
import { homeRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Footer from './Footer'
import Header from './Header'

const ClientLayout: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  if (currentUser && currentUser?.role === 'ADMIN')
    return <Navigate to={`/admin`} replace />

  return (
    <div>
      <Header />

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
