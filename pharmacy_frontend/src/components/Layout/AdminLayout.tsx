import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useStore } from '../../store'
import { adminRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Header from './Header'
import AdminNav from '../../views/Admin/AdminNav'

const AdminLayout: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  if (currentUser && currentUser?.role === 'EMPLOYEE')
    return <Navigate to={`/`} replace />

  return (
    <>
      <Header />
      <div className='fixed left w-1/5 min-h-full'>
        <AdminNav />
      </div>
      <div className='w-73/100 float-right p-10 relative top-28 bg-white rounded-md mr-8'>
        <Routes>
          {adminRoute.map(route => {
            const Page = route.component
            return <Route key={route.path} path={route.path} element={<Page />} />
          })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default AdminLayout
