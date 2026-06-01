import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  delete api.defaults.headers.common.Authorization
}

export function getApiErrorMessage(error, fallback = 'Ha ocurrido un error') {
  return error?.response?.data?.message || error?.message || fallback
}

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const storedToken = window.localStorage.getItem('skillswap_token')

    if (storedToken) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${storedToken}`
    }
  }

  return config
})

export default api
