import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { adminRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Header from './Header'

const AdminLayout: FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  return (
    <div>
      <Header />

      <Routes>
        {adminRoute.map(route => {
          const Page = route.component
          return <Route key={route.path} path={route.path} element={<Page />} />
        })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default AdminLayout