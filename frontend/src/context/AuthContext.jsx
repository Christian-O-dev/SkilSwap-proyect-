import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getApiErrorMessage, setAuthToken } from '../services/api.js'
import { getCurrentUser, loginUser, registerUser } from '../services/authService.js'

const AuthContext = createContext(null)

const STORAGE_TOKEN = 'skillswap_token'
const STORAGE_USER = 'skillswap_user'

function readStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(STORAGE_USER)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function readStoredToken() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(STORAGE_TOKEN) ?? ''
}

function storeSession(token, user) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_TOKEN, token)
  window.localStorage.setItem(STORAGE_USER, JSON.stringify(user))
}

function clearSessionStorage() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_TOKEN)
  window.localStorage.removeItem(STORAGE_USER)
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const restoreSession = async () => {
      const storedToken = readStoredToken()
      const storedUser = readStoredUser()

      if (!storedToken) {
        if (!isMounted) {
          return
        }

        setToken('')
        setUser(null)
        setAuthToken('')
        setLoading(false)
        return
      }

      setAuthToken(storedToken)
      setToken(storedToken)

      try {
        const response = await getCurrentUser()
        const nextUser = response.user ?? storedUser

        if (!isMounted) {
          return
        }

        setUser(nextUser)

        if (nextUser) {
          storeSession(storedToken, nextUser)
        }
      } catch {
        if (!isMounted) {
          return
        }

        clearSessionStorage()
        setAuthToken('')
        setToken('')
        setUser(null)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      isMounted = false
    }
  }, [])

  const signIn = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password })
      const nextToken = response.token
      const nextUser = response.user

      setToken(nextToken)
      setUser(nextUser)
      setAuthToken(nextToken)
      storeSession(nextToken, nextUser)

      return response
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'No se pudo iniciar sesion'))
    }
  }

  const signUp = async ({ username, email, password }) => {
    try {
      const response = await registerUser({ username, email, password })
      const nextToken = response.token
      const nextUser = response.user

      setToken(nextToken)
      setUser(nextUser)
      setAuthToken(nextToken)
      storeSession(nextToken, nextUser)

      return response
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'No se pudo crear la cuenta'))
    }
  }

  const signOut = () => {
    setToken('')
    setUser(null)
    setAuthToken('')
    clearSessionStorage()
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      signIn,
      signUp,
      signOut,
    }),
    [loading, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
