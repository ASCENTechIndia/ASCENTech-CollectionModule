import apiClient from './apiService'

const authService = {
  // Login API call
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', {
        userId: credentials.userId,
        password: credentials.password
      })

      const payload = response.data || {}
      const data = payload.data || {}

      // Check success flag in response
      if (!payload.success) {
        throw new Error(payload.message || 'Authentication failed')
      }

      // Normalize common API shapes:
      // 1) { success, message, token, user }
      // 2) { success, message, data: { token, user } }
      // 3) { success, message, data: { token, userId, userName, ... } }
      const token = payload.token || data.token || data.accessToken || data.jwt || null
      const user = payload.user || data.user || data.userData || data

      return {
        success: payload.success,
        message: payload.message,
        token,
        user
      }
    } catch (error) {
      // Handle API error responses (including 401)
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials. Please try again.')
      }
      
      const errorMessage = error.message || 'Login failed'
      throw new Error(errorMessage)
    }
  },

  // Logout API call (optional)
  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/auth/verify')
      return response.data
    } catch (error) {
      throw new Error('Token verification failed')
    }
  }
}

export default authService
