import React, { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useStore } from '../../store'
import { adminRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Header from './Header'

const AdminLayout: FC = () => {
  const currentUser = useStore(state => state.currentUser)

  if (currentUser && currentUser?.user_role === 'EMPLOYEE')
    return <Navigate to={`/`} replace />

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
