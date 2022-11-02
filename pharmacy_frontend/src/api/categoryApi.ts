import axiosClient from './axiosClient'

export const getCategoriesApi = (page: number | null, params: any | null) => {
  const queryParams = params
    ? Object.keys(params)
        .map(
          k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k].value)
        )
        .join('&')
    : ''
  return axiosClient.get(`/categories?page=${page}${queryParams}`)
}
