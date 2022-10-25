import React, { FC, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { homeRoute } from '../../routes'
import PageNotFound from '../../views/PageNotFound'
import Footer from './Footer'
import Header from './Header'

const ClientLayout: FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

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