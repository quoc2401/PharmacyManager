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

export const getRevenueApi = (
  timestamp: string | Date | null,
  last_visit: string | Date | null
) => {
  return axiosClient.get(
    `/order-details/revenue?timestamp=${timestamp}&last_visit=${last_visit}`
  )
}

export const getCountSaleApi = (
  timestamp: string | Date | null,
  last_visit: string | Date | null
) => {
  return axiosClient.get(
    `/order-details/count-sale?timestamp=${timestamp}&last_visit=${last_visit}`
  )
}

export const getRevenueMonthlyApi = (year: number | null) => {
  return axiosClient.get(
    `/order-details/revenue-monthly/${
      year === null ? new Date().getFullYear() : year
    }`
  )
}

export const getCountSaleMonthlyApi = (year: number | null) => {
  return axiosClient.get(
    `/order-details/count-sale-monthly/${
      year === null ? new Date().getFullYear() : year
    }`
  )
}
