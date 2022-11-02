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
