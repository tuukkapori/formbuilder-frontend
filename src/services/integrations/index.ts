import axios from 'axios'
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from 'firebase/functions'
import { getFirebaseApp } from '../firebase/app'
import { getIdBearerToken } from '../firebase/auth'

const app = getFirebaseApp()
const functions = getFunctions(app, 'europe-west1')

connectFunctionsEmulator(functions, 'localhost', 5001)

const baseUrl = process.env.REACT_APP_CLOUDRUN_API_BASE || ''

const getIntegrationsForForm = async (formId: string) => {
  const bearerToken = await getIdBearerToken()
  const res = await axios({
    headers: {
      authorization: bearerToken,
    },
    url: baseUrl + '/integrations/' + formId,
    method: 'GET',
  })

  return res.data
}

const activateGoogleSheetsIntegration = async (
  formId: string,
  spreadSheetName: string,
  tokenId: string
) => {
  const res = await httpsCallable(
    functions,
    'activateSheetsIntegration'
  )({ formId, spreadSheetName, tokenId })
  console.log('res from activating intergarion ', res)
}

const disableGoogleSheetsIntegration = async (formId: string) => {
  await httpsCallable(functions, 'disableSheetsIntegration')({ formId })
}

const activateEmailAutomation = async (
  formId: string,
  mailerliteGroupId: string,
  maxCapacity: number,
  fieldIdForEmail: string,
  fieldIdForName: string
) => {
  const res = await httpsCallable(
    functions,
    'activateEmailAutomation'
  )({ formId, mailerliteGroupId, maxCapacity, fieldIdForEmail, fieldIdForName })
  console.log('activ email res ', res)
}

const disableEmailAutomation = async (formId: string) => {
  const res = await httpsCallable(
    functions,
    'deactivateEmailAutomation'
  )({ formId })
  console.log('activate res ', res)
}

const IntegrationsAPI = {
  activateGoogleSheetsIntegration,
  disableGoogleSheetsIntegration,
  activateEmailAutomation,
  disableEmailAutomation,
  getIntegrationsForForm,
}

export default IntegrationsAPI
