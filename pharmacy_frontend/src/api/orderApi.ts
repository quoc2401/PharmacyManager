import { Order } from './../shared/types'
import axiosClient from './axiosClient'

export const createOrderApi = (data: Order) => {
  return axiosClient.post('/order', data)
}
