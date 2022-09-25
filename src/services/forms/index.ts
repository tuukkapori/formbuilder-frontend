import axios from 'axios'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { constants } from 'fs'
import API from '../api'
import { Form } from '../../types/forms'
import { getFirebaseApp } from '../firebase/app'
import { getIdBearerToken } from '../firebase/auth'

const app = getFirebaseApp()
const functions = getFunctions(app, 'europe-west1')

//connectFunctionsEmulator(functions, 'localhost', 5001)

const callFunction = async (functionName: string, body: any) => {
  const res = await httpsCallable(functions, functionName)(body)
  return res.data as any
}

const baseUrl = process.env.REACT_APP_CLOUDRUN_API_BASE || ''

const getForms = async () => {
  const res = await API.GET('/forms')
  return res.data
}

const getFormById = async (formId: string) => {
  const res = await API.GET('/forms')
  return res.data
}

const getAnwersForForm = async (formId: string) => {
  const bearerToken = await getIdBearerToken()
  const res = await axios({
    headers: {
      authorization: bearerToken,
    },
    method: 'GET',
    url: baseUrl + '/answers/' + formId,
  })
  return res.data
}

const createForm = async (form: any) => {
  const bearerToken = await getIdBearerToken()
  const res = await axios({
    headers: {
      authorization: bearerToken,
    },
    method: 'POST',
    url: baseUrl + '/forms/',
    data: {
      form,
    },
  })
  return res.data as { form: any; formId: string }
}

const deleteForm = async (formId: string) => {
  await httpsCallable(functions, 'deleteForm')({ formId })
}

const getAutomation = async (formId: string) => {
  const res = (await httpsCallable(
    functions,
    'getAutomation'
  )({ formId })) as any
  return res.data.automation
}

const saveFormChanges = async (formId: string, form: any) => {
  const data = await callFunction('saveFormChanges', { formId, form })
  return data
}

const publishForm = async (formId: string) => {
  return await httpsCallable(
    functions,
    'setFormStatus'
  )({ formId, status: 'open' })
}

const unpublishForm = async (formId: string) => {
  await httpsCallable(functions, 'setFormStatus')({ formId, status: 'closed' })
}

const getFormPublic = async (formId: string) => {
  const url = process.env.REACT_APP_API_BASE_URL + '/getFormPublic'
  const res = await axios.post(url, {
    formId,
  })
  return res.data
}

const FormsAPI = {
  createForm,
  publishForm,
  unpublishForm,
  saveFormChanges,
  getAutomation,
  getAnwersForForm,
  getForms,
  getFormById,
  deleteForm,
  getFormPublic,
}

export default FormsAPI
