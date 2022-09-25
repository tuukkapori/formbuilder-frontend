import {
  getAuth,
  onAuthStateChanged,
  User,
  browserSessionPersistence,
} from 'firebase/auth'
import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)
  const auth = getAuth()
  useEffect(() => {
    const handleStateChange = async () => {
      await auth.setPersistence(browserSessionPersistence)
      onAuthStateChanged(auth, (user) => {
        setUser(user)
      })
    }
    handleStateChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
