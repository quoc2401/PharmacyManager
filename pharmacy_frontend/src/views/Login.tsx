import React, { FC, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginApi } from '../api/authApi'
import { setAuthToken } from '../api/axiosClient'
import { useStore } from '../store'
import { toast } from 'react-toastify'
import { useQueryParam } from '../hooks/useQueryParam'

const Login: FC = () => {
  const currentUser = useStore(state => state.currentUser)
  const setCurrentUser = useStore(state => state.setCurrentUser)
  const { redirect } = useQueryParam()
  const [loading, setLoading] = useState(false)
  useTitle('Pharmacy - Login')

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required!')
        .min(6, 'Username must be at least 6 characters!'),
      password: Yup.string()
        .required('Password is required!')
        .min(6, 'Password must be at least 6 characters!')
    }),
    onSubmit: async value => {
      setLoading(true)
      try {
        const res = await loginApi(value)

        if (res.status === 200) {
          localStorage.setItem('pharmacy-token', res.data.access_token)
          setAuthToken(res.data.access_token)
          setCurrentUser(res.data.user)
          toast.success('Login successful', {
            theme: 'colored'
          })
        }
        setLoading(false)
      } catch (error) {
        toast.error(error.message, { theme: 'colored' })
        setLoading(false)
      }
    }
  })

  if (currentUser) return <Navigate to={redirect || '/'} />

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-200"
      style={{
        backgroundImage:
          'url(https://demos.creative-tim.com/vue-argon-design-system-pro/img/ill/404.svg)',
        backgroundPosition: '50%',
        backgroundSize: 'cover'
      }}
    >
      <div className="relative w-[500px] max-w-mx-4 min-h-[460px] bg-white rounded-lg px-4 py-7 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 rounded-full">
            <img
              src="https://www.primefaces.org/atlantis-react/assets/layout/images/logo-dark.png"
              alt="logo"
              width={80}
            />
          </div>
          <h5 className="text-2xl font-semibold text-green-600">Pharmacy</h5>
          <p className="text-sm text-slate-400 mt-2">Sign in to continue</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-fluid space-y-6 mt-6">
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-user" />
              <InputText
                disabled={loading}
                id="username"
                name="username"
                className={formik.errors.username ? 'p-invalid' : ''}
                value={formik.values.username}
                onChange={formik.handleChange}
                style={{ padding: '12px 32px 12px 12px' }}
              />
              <label
                htmlFor="username"
                className={formik.errors.username ? 'p-error' : ''}
                style={{ left: '12px' }}
              >
                Username*
              </label>
            </span>
            {formik.errors.username && (
              <p className="text-xs text-red-500 ml-1">
                {formik.errors.username}
              </p>
            )}
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <Password
                disabled={loading}
                id="password"
                name="password"
                className={formik.errors.password ? 'p-invalid' : ''}
                inputStyle={{ padding: '12px 32px 12px 12px' }}
                value={formik.values.password}
                onChange={formik.handleChange}
                feedback={false}
                toggleMask
              />
              <label
                htmlFor="password"
                className={formik.errors.password ? 'p-error' : ''}
                style={{ left: '12px' }}
              >
                Password*
              </label>
            </span>
            {formik.errors.password && (
              <p className="text-xs text-red-500 ml-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <Button
            disabled={loading}
            loading={loading}
            type="submit"
            label="SIGN IN"
            className="p-button-success p-3 font-medium"
          />
        </form>
      </div>
    </div>
  )
}

export default Login
