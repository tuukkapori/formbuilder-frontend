import { Action } from 'redux'
import { put, all, takeEvery, call } from 'redux-saga/effects'
import {
  addGoogleSheetsAccount,
  addGoogleSheetsAccountFail,
  addGoogleSheetsAccountSuccess,
  getGoogleSheetsAccounts,
  getGoogleSheetsAccountsSuccess,
  getGoogleSheetsAccountsFail,
  getEditorFormIntegrations,
  getEditorFormIntegrationsSuccess,
  getEditorFormIntegrationsFail,
  deleteGoogleSheetsAccount,
  deleteGoogleSheetsAccountFail,
  deleteGoogleSheetsAccountSuccess,
} from '../actions/integrations'
import API from '../services/api'
import {
  addGoogleSheetsAccountToLocalStorage,
  deleteGoogleSheetsAccountFromLocalStorage,
  getGoogleSheetsAccountsFromLocalStorage,
} from '../utils/localStorage'

export function* handleGetGoogleSheetsAccounts(): Generator<Action, any, any> {
  try {
    const accounts = yield call(getGoogleSheetsAccountsFromLocalStorage)
    yield put(getGoogleSheetsAccountsSuccess(accounts))
  } catch (error: any) {
    yield put(getGoogleSheetsAccountsFail())
  }
}

export function* handleAddGoogleSheetsAccount({
  payload: account,
}: any): Generator<Action, any, boolean> {
  try {
    const added = yield call(addGoogleSheetsAccountToLocalStorage, account)
    if (added) {
      yield put(addGoogleSheetsAccountSuccess(account))
    } else {
      yield put(addGoogleSheetsAccountFail('Account already exists'))
    }
  } catch (error) {
    yield put(addGoogleSheetsAccountFail())
  }
}

export function* handleGetEditorFormIntegrations({
  payload: formId,
}: any): Generator<Action, any, any> {
  try {
    const integrations = yield call(API.GET, `/integrations/${formId}`)
    yield put(getEditorFormIntegrationsSuccess(integrations))
  } catch (error) {
    yield put(getEditorFormIntegrationsFail())
  }
}

export function* handleDeleteGoogleSheetsAccount({
  payload: googleUserId,
}: any): Generator<Action, any, any> {
  try {
    yield call(API.DELETE, `integrations/googleSheetsAccounts/${googleUserId}`)
    yield call(deleteGoogleSheetsAccountFromLocalStorage, googleUserId)

    yield put(deleteGoogleSheetsAccountSuccess(googleUserId))
  } catch (error) {
    yield put(deleteGoogleSheetsAccountFail())
  }
}

export function* watchIntegrationsActions() {
  yield all([
    takeEvery(getGoogleSheetsAccounts, handleGetGoogleSheetsAccounts),
    takeEvery(addGoogleSheetsAccount, handleAddGoogleSheetsAccount),
    takeEvery(getEditorFormIntegrations, handleGetEditorFormIntegrations),
    takeEvery(deleteGoogleSheetsAccount, handleDeleteGoogleSheetsAccount),
  ])
}
