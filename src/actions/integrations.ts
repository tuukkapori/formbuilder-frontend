import { createAction } from 'redux-actions'

const createAsyncIntegrationsAction = (action: string) => ({
  action: createAction(`INTEGRATIONS/${action}`) as any,
  success: createAction(`INTEGRATIONS/${action}_SUCCESS`) as any,
  fail: createAction(`INTEGRATIONS/${action}_FAIL`) as any,
})

/* const createIntegrationsAction = (type: string) =>
  createAction(`INTEGRATIONS/${type}`) as any */

const {
  action: getEditorFormIntegrations,
  success: getEditorFormIntegrationsSuccess,
  fail: getEditorFormIntegrationsFail,
} = createAsyncIntegrationsAction('GET_EDITOR_FORM_INTEGRATIONSS')

const {
  action: addGoogleSheetsAccount,
  success: addGoogleSheetsAccountSuccess,
  fail: addGoogleSheetsAccountFail,
} = createAsyncIntegrationsAction('ADD_GOOGLE_SHEETS_ACCOUNT')

const {
  action: getGoogleSheetsAccounts,
  success: getGoogleSheetsAccountsSuccess,
  fail: getGoogleSheetsAccountsFail,
} = createAsyncIntegrationsAction('GET_GOOGLE_SHEETS_ACCOUNTS')

const {
  action: deleteGoogleSheetsAccount,
  success: deleteGoogleSheetsAccountSuccess,
  fail: deleteGoogleSheetsAccountFail,
} = createAsyncIntegrationsAction('DELETE_GOOGLE_SHEETS_ACCOUNT')

export {
  getGoogleSheetsAccounts,
  getGoogleSheetsAccountsSuccess,
  getGoogleSheetsAccountsFail,
  addGoogleSheetsAccount,
  addGoogleSheetsAccountSuccess,
  addGoogleSheetsAccountFail,
  getEditorFormIntegrations,
  getEditorFormIntegrationsSuccess,
  getEditorFormIntegrationsFail,
  deleteGoogleSheetsAccount,
  deleteGoogleSheetsAccountSuccess,
  deleteGoogleSheetsAccountFail,
}
