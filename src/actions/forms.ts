import { createAction } from 'redux-actions'

const createAsyncFormAction = (action: string) => ({
  action: createAction(`FORMS/${action}`) as any,
  success: createAction(`FORMS/${action}_SUCCESS`) as any,
  fail: createAction(`FORMS/${action}_FAIL`) as any,
})

const createFormAction = (type: string) => createAction(`FORMS/${type}`) as any

const {
  action: getForms,
  success: getFormsSuccess,
  fail: getFormsFail,
} = createAsyncFormAction('GET_FORMS')

const setSubmitting = createFormAction('SET_SUBMITTING')

const {
  action: getForm,
  success: getFormSuccess,
  fail: getFormFail,
} = createAsyncFormAction('GET_FORM')

const {
  action: createForm,
  success: createFormSuccess,
  fail: createFormFail,
} = createAsyncFormAction('CREATE_FORM')

const {
  action: deleteForm,
  success: deleteFormSuccess,
  fail: deleteFormFail,
} = createAsyncFormAction('DELETE_FORM')

const {
  action: getAnswersForForm,
  success: getAnswersForFormSuccess,
  fail: getAnswersForFormFail,
} = createAsyncFormAction('GET_ANSWERS_FOR_FORM')

export {
  getForms,
  getFormsSuccess,
  getFormsFail,
  setSubmitting,
  getForm,
  getFormSuccess,
  getFormFail,
  deleteForm,
  deleteFormSuccess,
  deleteFormFail,
  createForm,
  createFormSuccess,
  createFormFail,
  getAnswersForForm,
  getAnswersForFormSuccess,
  getAnswersForFormFail,
}
