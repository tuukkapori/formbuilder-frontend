import { handleActions } from 'redux-actions'
import type { Reducer } from '@reduxjs/toolkit'
import {
  addGoogleSheetsAccountSuccess,
  deleteGoogleSheetsAccountSuccess,
  getGoogleSheetsAccountsSuccess,
} from '../actions/integrations'
import { IntegrationsState } from '../types/state'
import { Action } from '../types/actions'
import { GoogleAccount } from '../types/integrations'

const initialState: IntegrationsState = {
  googleSheetsAccounts: [],
}

const integrationsReducer = handleActions<IntegrationsState, any>(
  {
    [addGoogleSheetsAccountSuccess]: (
      state,
      { payload: account }: Action<GoogleAccount>
    ) => ({
      ...state,
      googleSheetsAccounts: [...state.googleSheetsAccounts, account],
    }),
    [getGoogleSheetsAccountsSuccess]: (
      state,
      { payload: accounts }: Action<GoogleAccount[]>
    ) => ({
      ...state,
      googleSheetsAccounts: accounts,
    }),
    [deleteGoogleSheetsAccountSuccess]: (
      state,
      { payload: accountId }: Action<string>
    ) => ({
      ...state,
      googleSheetsAccounts: [
        ...state.googleSheetsAccounts.filter((acc) => acc.id !== accountId),
      ],
    }),
  },
  initialState
) as Reducer

export default integrationsReducer
