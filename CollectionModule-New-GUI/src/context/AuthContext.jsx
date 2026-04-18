import { createContext, useContext, useState, useCallback } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      // Call auth service API
      const response = await authService.login(credentials)

      // Extract token and user from API response
      const token = response?.token
      const userData = response?.user || {}

      if (!response.success || !token) {
        throw new Error(response.message || 'Authentication failed')
      }

      // Map API response to application user object
      const mappedUser = {
        ...userData,
        name: userData.userName || userData.name || userData.fullName || '',
        id: userData.userId || userData.id,
        email: userData.email || ''
      }

      // Store user and token
      setUser(mappedUser)
      setToken(token)
      localStorage.setItem('user', JSON.stringify(mappedUser))
      localStorage.setItem('token', token)

      return mappedUser
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      // Call logout API
      await authService.logout()
    } catch (error) {
      console.error('Logout API error:', error)
    }
    
    // Clear local state and storage
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }, [])

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
