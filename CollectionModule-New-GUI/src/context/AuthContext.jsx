<<<<<<< HEAD
import { createContext, useContext, useState, useCallback } from 'react'
=======
import { createContext, useCallback, useContext, useState } from 'react'
>>>>>>> 0b8e7afd479e57f7516fc704b13ef36dfd64e679
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
<<<<<<< HEAD
      // Call auth service API
      const response = await authService.login(credentials)

      // Extract token and user from API response
      const token = response?.token
      const userData = response?.user || {}

      if (!response.success || !token) {
        throw new Error(response.message || 'Authentication failed')
      }

      // Map API response to application user object
=======
      const response = await authService.login(credentials)

      const nextToken = response?.token
      const userData = response?.user || {}

      if (!response?.success || !nextToken) {
        throw new Error(response?.message || 'Authentication failed')
      }

>>>>>>> 0b8e7afd479e57f7516fc704b13ef36dfd64e679
      const mappedUser = {
        ...userData,
        name: userData.userName || userData.name || userData.fullName || '',
        id: userData.userId || userData.id,
<<<<<<< HEAD
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
=======
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
>>>>>>> 0b8e7afd479e57f7516fc704b13ef36dfd64e679
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
<<<<<<< HEAD
      // Call logout API
      await authService.logout()
    } catch (error) {
      console.error('Logout API error:', error)
    }
    
    // Clear local state and storage
=======
      await authService.logout()
    } catch (apiError) {
      console.error('Logout API error:', apiError)
    }

>>>>>>> 0b8e7afd479e57f7516fc704b13ef36dfd64e679
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
