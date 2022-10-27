import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`
})

axiosClient.interceptors.request.use(async config => {
  return config
})

axiosClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export const setAuthToken = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosClient.defaults.headers.common['Authorization']
  }
}

export default axiosClient
