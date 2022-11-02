import axiosClient from './axiosClient'
import { User } from '../shared/types'

export const getUsers = (params: any, page: number | null) => {
  const queryParams = params ? Object.keys(params)
  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k].value)).join('&') : ''

  return axiosClient.get(`/users?page=${page}&${queryParams}`)
}

export const updateUser = (user: User) => {
  const data = {
    user : {...user}
  }
  return axiosClient.put(`/users/${user.id}`, data)
}

export const createUser = (user: User) => {
  const data = {
    user : {...user}
  }

  return axiosClient.post('/users', data)
}

export const deleteUser = (user: User) => {
  return axiosClient.delete(`/users/${user.id}`)
}

export const deleteUsers = (users: User[]) => {
  return axiosClient.patch(`/users/delete`, users)
}