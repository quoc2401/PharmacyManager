import axiosClient from './axiosClient'

interface Params {
  page: number
  category: number | null
}

export const getMedicinesApi = (_param: Params) => {
  return axiosClient.get(`/medicines?page=${_param.page}`)
}

export const getMedicineByIdApi = (id: number) => {
  return axiosClient.get(`/medicines/${id}`)
}

export const createMedicineApi = (medicine: FormData) => {
  return axiosClient.post(`/medicines`, medicine, {
    headers: {
      accept: 'multipart/form-data',
      'content-type': 'multipart/form-data'
    }
  })
}

export const updateMedicineApi = (id: number, medicine: FormData) => {
  return axiosClient.put(`/medicines/${id}`, medicine, {
    headers: {
      accept: 'multipart/form-data',
      'content-type': 'multipart/form-data'
    }
  })
}

export const deleteMedicineApi = (id: number) => {
  return axiosClient.post(`/medicines/${id}`)
}
