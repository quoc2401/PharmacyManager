import { Order } from './../shared/types'
import axiosClient from './axiosClient'

export const createOrderApi = (data: Order) => {
  return axiosClient.post('/orders', data)
}

export const getOrdersApi = (page: number, params: any) => {
  const queryParams = params
    ? Object.keys(params)
        .map(
          k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k].value)
        )
        .join('&')
    : ''
  return axiosClient.get(`/orders?page=${page}&${queryParams}`)
}

export const countOrderApi = (timestamp:string|Date|null, last_visit:string|Date|null) => {
  return axiosClient.get(`/orders/count?timestamp=${timestamp}&last_visit=${last_visit}`)
}
