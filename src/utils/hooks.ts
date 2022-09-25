import { onAuthStateChanged } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { getFirebaseAuth } from '../services/firebase/app'

export const useAuthListener = () => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(false)

  // keep track to display a spinner while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true)
  const auth = getFirebaseAuth()

  useEffect(() => {
    // auth listener to keep track of user signing in and out
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setCheckingStatus(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [loggedIn, checkingStatus]
}
