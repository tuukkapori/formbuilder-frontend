import { Form } from './forms'
import { GoogleAccount } from './integrations'

export interface MediaState {
  mediaFiles: any[]
}

export interface Integrations {
  email: any
  maxCapacity: number
  googleSheets: any
  userId: string
  type: string
}

export interface FormEditorState {
  form: Form
  integrations: Integrations
  selectedField: string
  unsavedChanges?: boolean
  submitting?: boolean
}

export interface NotificationsState {
  open: boolean
  type?: string
  message?: string
}

export interface Forms {
  [key: string]: Form
}

export interface FormsState {
  forms: Forms
  answers: any
  submitting?: boolean
}

export interface IntegrationsState {
  googleSheetsAccounts: GoogleAccount[]
}

export interface StateInterface {
  media: MediaState
  forms: FormsState
  notifications: NotificationsState
  formEditor: FormEditorState
  integrations: IntegrationsState
}
