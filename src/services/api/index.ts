import axios from 'axios'
import { getFirebaseAuth } from '../firebase/app'

const baseUrl = process.env.REACT_APP_CLOUDRUN_API_BASE || ''

const publicApiUrl = process.env.REACT_APP_PUBLIC_API_URL || ''

const GET = async (path: string) => {
  const token = await getFirebaseAuth().currentUser?.getIdToken()

  const res = await axios({
    method: 'GET',
    url: baseUrl + path,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

const POST = async (path: string, body?: any) => {
  const token = await getFirebaseAuth().currentUser?.getIdToken()

  const res = await axios({
    method: 'POST',
    url: baseUrl + path,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: body,
  })
  return res.data
}

const PUT = async (path: string, body: any) => {
  const token = await getFirebaseAuth().currentUser?.getIdToken()

  const res = await axios({
    method: 'PUT',
    url: baseUrl + path,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: body,
  })
  return res.data
}

const DELETE = async (path: string) => {
  const token = await getFirebaseAuth().currentUser?.getIdToken()

  const res = await axios({
    method: 'DELETE',
    url: baseUrl + path,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const PublicAPI = {
  GET: async (path: string) => {
    const res = await axios({
      method: 'GET',
      url: publicApiUrl + path,
    })
    return res.data
  },
}

const API = {
  GET,
  POST,
  DELETE,
  PUT,
}

export default API
