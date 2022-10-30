import axiosClient from './axiosClient'

interface loginData {
  username: string
  password: string
}

export const loginApi = (data: loginData) => {
  return axiosClient.post('/auth/login', data)
}

export const getUserProfileApi = () => {
  return axiosClient.get('/auth/user-profile')
}

export const refreshTokenApi = () => {
  return axiosClient.post('/auth/refresh')
}

export const logoutApi = () => {
  return axiosClient.post('/auth/logout')
}
