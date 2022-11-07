import axios from 'axios'

export const controller = new AbortController()

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}api`
})

axiosClient.interceptors.request.use(async config => {
  return config
})

axiosClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosClient.defaults.headers.common['Authorization']
  }
}

export default axiosClient
