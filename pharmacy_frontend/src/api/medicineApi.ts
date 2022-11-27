import { Medicine } from '../shared/types'
import axiosClient from './axiosClient'

export const getMedicinesApi = (page: number | null, params: any) => {
  const queryParams = params
    ? Object.keys(params)
        .map(
          k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k].value)
        )
        .join('&')
    : ''
  return axiosClient.get(`/medicines?page=${page}&${queryParams}`)
}

export const getMedicineByIdApi = (id: number | string | undefined) => {
  return axiosClient.get(`/medicines/${id}`)
}

export const createMedicineApi = (medicine: FormData) => {
  return axiosClient.post(`/medicines`, medicine)
}

export const updateMedicineApi = (formData: FormData) => {
  return axiosClient.putForm(`/medicines/${formData.get('id')}`, formData)
}

export const deleteMedicineApi = (id: number) => {
  return axiosClient.delete(`/medicines/${id}`)
}

export const patchDeleteMedicineApi = (medicines: Medicine[]) => {
  return axiosClient.patch(`/medicines/delete`, medicines)
}

export const stockCountApi = (lastCount: string | null) => {
  return axiosClient.get(`/medicines/stock-count?last_count=${lastCount}`)
}

export const getRecentSaleMedicineApi = () => {
  return axiosClient.get(`/medicines/recent-sale`)
}
