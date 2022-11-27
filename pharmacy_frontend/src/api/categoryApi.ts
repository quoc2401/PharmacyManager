import { Category } from '../shared/types'
import axiosClient from './axiosClient'

export const getCategoriesApi = (page: number | null, params: any | null) => {
  const queryParams = params
    ? Object.keys(params)
        .map(
          k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k].value)
        )
        .join('&')
    : ''
  return axiosClient.get(`/categories?page=${page}&${queryParams}`)
}

export const updateCategoryApi = (category: Category) => {
  const data = {
    category: { ...category }
  }
  return axiosClient.put(`/categories/${category.id}`, data)
}

export const createCategoryApi = (category: Category) => {
  const data = {
    category: { ...category }
  }
  return axiosClient.post(`/categories`, data)
}

export const deleteCategoryApi = (id: number) => {
  return axiosClient.delete(`/categories/${id}`)
}

export const deleteCategoriesApi = (categories: Category[]) => {
  return axiosClient.patch(`/categories/delete`, categories)
}
