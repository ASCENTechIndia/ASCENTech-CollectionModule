import { createContext, useCallback, useContext, useState } from 'react'
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
      const response = await authService.login(credentials)

      const nextToken = response?.token
      const userData = response?.user || {}

      if (!response?.success || !nextToken) {
        throw new Error(response?.message || 'Authentication failed')
      }

      const mappedUser = {
        ...userData,
        name: userData.userName || userData.name || userData.fullName || '',
        id: userData.userId || userData.id,
        email: userData.email || '',
      }

      setUser(mappedUser)
      setToken(nextToken)
      localStorage.setItem('user', JSON.stringify(mappedUser))
      localStorage.setItem('token', nextToken)

      return mappedUser
    } catch (apiError) {
      const message = apiError.message || 'Login failed. Please check your credentials.'
      setError(message)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch (apiError) {
      console.error('Logout API error:', apiError)
    }

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
