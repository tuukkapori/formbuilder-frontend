import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from '@firebase/auth'
import { getFirebaseAuth } from './app'

const signIn = async (email: string, password: string) => {
  const auth = await getFirebaseAuth()
  await setPersistence(auth, browserSessionPersistence)
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )
  return userCredentials
}

const getIdBearerToken = async () => {
  const token = await getFirebaseAuth().currentUser?.getIdToken()
  return `Bearer ${token}`
}

const getAuthToken = async () => {
  const token = await getFirebaseAuth().currentUser?.getIdToken()
  return token
}

const getFirebaseUserId = async () => {
  const userId = getFirebaseAuth().currentUser?.uid
  return userId
}

export { signIn, getIdBearerToken, getFirebaseUserId, getAuthToken }
