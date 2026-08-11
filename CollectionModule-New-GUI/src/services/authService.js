import apiClient from './apiClient'
import { encryptPassword } from '../utils/passwordCrypto'

const authService = {
  login: async (credentials) => {
    try {
      // const encryptedPassword = await encryptPassword(credentials.password)

      const payload = await apiClient.post('/auth/login', {
        userId: credentials.userId,
        password: credentials.password,
      })

      const data = payload?.data || {}

      if (!payload?.success) {
        throw new Error(payload?.message || 'Authentication failed')
      }

      const token = payload.token || data.token || data.accessToken || data.jwt || null
      const user = payload.user || data.user || data.userData || data

      return {
        success: payload.success,
        message: payload.message,
        token,
        user,
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed')
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  verifyToken: async () => {
    try {
      return await apiClient.get('/auth/verify')
    } catch (error) {
      throw new Error('Token verification failed')
    }
  },

  forgotPassword: async (email) => {
    try {
      const payload = await apiClient.post('/auth/forgot-password', { email })
      if (!payload?.success) {
        throw new Error(payload?.message || 'Failed to process forgot password request')
      }
      return payload
    } catch (error) {
      throw new Error(error.message || 'Forgot password failed')
    }
  },

  resetPasswordWithToken: async (userId, token, newPassword) => {
    try {
      const payload = await apiClient.post('/auth/reset-password-with-token', { userId, token, newPassword })
      if (!payload?.success) {
        throw new Error(payload?.message || 'Failed to reset password')
      }
      return payload
    } catch (error) {
      throw new Error(error.message || 'Reset password failed')
    }
  },
}

export default authService
