import { GoogleAccount } from '../integrations'

export interface AddGoogleSheetsAccountPayload {
  type: any
  payload: GoogleAccount
}

export interface DeleteGoogleSheetsAccountPayload {
  payload: string
}

export interface GetGoogleSheetsAccountsSuccessPayload {
  payload: GoogleAccount[]
}

export type IntegrationsActionPayload =
  | AddGoogleSheetsAccountPayload
  | DeleteGoogleSheetsAccountPayload
  | GetGoogleSheetsAccountsSuccessPayload
