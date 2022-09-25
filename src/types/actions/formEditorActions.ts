import { Form } from '../forms'
import { Integrations } from '../state'

export interface InitFormEditorPayload {
  form: Form
  integrations: Integrations
}

export interface SetFieldPropertyPayload {
  fieldId: string
  key: string
  value: any
}

export interface SetPropertyPayload {
  key: string
  value: any
}
