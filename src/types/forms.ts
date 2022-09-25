export enum FormFieldType {
  opening = 'opening',
  afterSubmit = 'AfterSubmit',
  textShort = 'textShort',
  textLong = 'textLong',
  email = 'email',
  selectOne = 'selectOne',
  selectMultiple = 'selectMultiple',
}

export const isMultipleChoicefield = (
  field: FormField
): field is SelectOneField | SelectMultipleField =>
  field.type === FormFieldType.selectMultiple ||
  field.type === FormFieldType.selectOne

interface FormFieldBase {
  id: string
  title: string
  description?: string
  required: boolean
  type: FormFieldType
}

export interface Opening extends FormFieldBase {}
export interface AfterSubmit extends FormFieldBase {}

export interface TextShortField extends FormFieldBase {}

export interface TextLongField extends FormFieldBase {}

export interface EmailField extends FormFieldBase {}

export interface SelectOneField extends FormFieldBase {
  options: string[]
  radio: boolean
}

export interface SelectMultipleField extends FormFieldBase {
  options: string[]
}

export type FormField =
  | TextShortField
  | TextLongField
  | EmailField
  | SelectOneField
  | SelectMultipleField

export interface FormBackground {
  type: 'image' | 'color'
  value: string
}

export interface CssStyles {
  [key: string]: string
}

export interface FieldsStyles {
  description: CssStyles
  title: CssStyles
  options: CssStyles
  input: CssStyles
}

export interface MainStyles {
  title: CssStyles
  description: CssStyles
  button: CssStyles
  container: CssStyles
}

export interface FormStyles {
  main: MainStyles
  color: string
  coverImage?: string
  openingScreen?: CssStyles
  afterSubmit: CssStyles
  background: CssStyles
  fields: FieldsStyles
}

export enum FormStatus {
  draft = 'draft',
  open = 'open',
  closed = 'closed',
}

export enum FormType {
  singlePage = 'singlePage',
  slides = 'slides',
}

export interface AfterSubmit {
  title: string
  description?: string
}

export interface Form {
  formId: string
  formType: FormType
  status: FormStatus
  title: string
  name: string
  description?: string
  submitText?: string
  styles: FormStyles
  openingScreen?: any
  afterSubmit: AfterSubmit
  fields: FormField[]
}

export const isOpening = (field: FormField): field is Opening =>
  field.type === FormFieldType.opening

export const isEnding = (field: FormField): field is AfterSubmit =>
  field.type === FormFieldType.afterSubmit

export const isShortTextField = (field: FormField): field is TextShortField =>
  field.type === FormFieldType.textShort

export const isLongTextField = (field: FormField): field is TextLongField =>
  field.type === FormFieldType.textLong

export const isSelectMultipleField = (
  field: FormField
): field is SelectMultipleField => field.type === FormFieldType.selectMultiple

export const isSelectOneField = (field: FormField): field is SelectOneField =>
  field.type === FormFieldType.selectOne

export const isEmailfield = (field: FormField): field is EmailField =>
  field.type === FormFieldType.email
