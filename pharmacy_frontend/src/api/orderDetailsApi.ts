import axiosClient from './axiosClient'

export const getOrderDetailsApi = (page: number, params: any) => {
    const queryParams = params
      ? Object.keys(params)
          .map(
            k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k].value)
          )
          .join('&')
      : ''
    return axiosClient.get(`/order-details?page=${page}&${queryParams}`)
  }
  