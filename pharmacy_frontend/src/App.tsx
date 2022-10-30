import { FC, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CircularProgress } from 'react-cssfx-loading'
import Login from './views/Login'
import PrivateRoute from './components/PrivateRoute'
import ClientLayout from './components/Layout/ClientLayout'
import AdminLayout from './components/Layout/AdminLayout'
import { useStore } from './store'
import { setAuthToken } from './api/axiosClient'
import { refreshTokenApi } from './api/authApi'

const App: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const setCurrentUser = useStore(state => state.setCurrentUser)
  const logout = useStore(state => state.logout)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await refreshTokenApi()
        if (res.status === 200) {
          localStorage.setItem('pharmacy-token', res.data.access_token)
          setAuthToken(res.data.access_token)
          setCurrentUser(res.data.user)
        }
      } catch (error) {
        logout()
      }
    }
    const token = localStorage.getItem('pharmacy-token') || ''
    if (!token) {
      logout()
    } else {
      setAuthToken(token as string)
      getUserProfile()
    }
  }, [])

  if (typeof currentUser === 'undefined')
    return (
      <div className="fixed bg-slate-200 top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center z-[9999]">
        <CircularProgress color="#22c55e" />
      </div>
    )

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <ClientLayout />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
