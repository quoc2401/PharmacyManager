import axiosClient from './axiosClient'

export const getUsers = (page: number) => {
  return axiosClient.get(`/users?page=${page}`)
}
