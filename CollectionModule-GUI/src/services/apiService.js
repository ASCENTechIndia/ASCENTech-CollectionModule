import axios from 'axios'

let activeRequests = 0
const loadingSubscribers = new Set()

const notifyLoadingSubscribers = () => {
  const isLoading = activeRequests > 0
  loadingSubscribers.forEach((subscriber) => subscriber(isLoading))
}

const incrementRequestCount = () => {
  activeRequests += 1
  notifyLoadingSubscribers()
}

const decrementRequestCount = () => {
  activeRequests = Math.max(0, activeRequests - 1)
  notifyLoadingSubscribers()
}

export const subscribeApiLoading = (subscriber) => {
  loadingSubscribers.add(subscriber)
  subscriber(activeRequests > 0)

  return () => {
    loadingSubscribers.delete(subscriber)
  }
}

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - add token to headers
apiClient.interceptors.request.use(
  (config) => {
    incrementRequestCount()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle global errors
apiClient.interceptors.response.use(
  (response) => {
    decrementRequestCount()
    return response
  },
  (error) => {
    decrementRequestCount()
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
