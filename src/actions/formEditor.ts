import { createAction } from 'redux-actions'

const createFormEditorAction = (type: string) =>
  createAction(`FORM_EDITOR/${type}`) as any

const createAsyncFormEditorAction = (action: string) => ({
  action: createAction(`FORM_EDITOR/${action}`) as any,
  success: createAction(`FORM_EDITOR/${action}_SUCCESS`) as any,
  fail: createAction(`FORM_EDITOR/${action}_FAIL`) as any,
})

const setFormEditorSubmitting = createFormEditorAction('SET_SUBMITTING')

const selectFormField = createFormEditorAction('SELECT_FIELD')

const addFormField = createFormEditorAction('ADD_FIELD')

const deleteFormField = createFormEditorAction('DELETE_FIELD')

const setFieldProperty = createFormEditorAction('SET_FIELD_PROPERTY')

const setFields = createFormEditorAction('SET_FIELDS')

const setOpeningScreenProperty = createFormEditorAction(
  'SET_OPENING_SCREEN_PROPERTY'
)

const setMainTitleStyleProperty = createFormEditorAction('STYLE_MAIN_TITLE')
const setMainDescriptionStyleProperty = createFormEditorAction(
  'STYLE_MAIN_DESCRIPTION'
)

const setMainButtonStyleProperty = createFormEditorAction('STYLE_MAIN_BUTTON')

const setAfterSubmitProperty = createFormEditorAction(
  'SET_AFTER_SUBMIT_PROPERTY'
)

const setFieldInputStyleProperty = createFormEditorAction('STYLE_FIELD_INPUT')

const setFieldTitleStyleProperty = createFormEditorAction('STYLE_FIELD_TITLE')

const setFormBackgroundProperty = createFormEditorAction(
  'SET_BACKGROUND_PROPERTY'
)

const setQuestionOptionProperty = createFormEditorAction('SET_OPTION_PROPERTY')

const setFormBackgroundFilter = createFormEditorAction('SET_BACKGROUND_FILTER')

const setFormAfterSubmitStyleProperty = createFormEditorAction(
  'SET_AFTERSUBMIT_STYLE_PROPERTY'
)

const setFormOpeningScreenStyleProperty = createFormEditorAction(
  'SET_OPENINGSCREEN_STYLE_PROPERTY'
)

const {
  action: initFormEditor,
  success: initFormEditorSuccess,
  fail: initFormEditorFail,
} = createAsyncFormEditorAction('INIT')

const resetFormEditor = createFormEditorAction('RESET')

const {
  action: publishForm,
  success: publishFormSuccess,
  fail: publishFormFail,
} = createAsyncFormEditorAction('PUBLISH_FORM')

const {
  action: unpublishForm,
  success: unpublishFormSuccess,
  fail: unpublishFormFail,
} = createAsyncFormEditorAction('UNPUBLISH_FORM')

const {
  action: saveChanges,
  success: saveChangesSuccess,
  fail: saveChangesFail,
} = createAsyncFormEditorAction('SAVE_CHANGES')

const {
  action: activateEmailAutomation,
  success: activateEmailAutomationSuccess,
  fail: activateEmailAutomationFail,
} = createAsyncFormEditorAction('ACTIVATE_EMAIL_AUTOMATION')

const {
  action: disableEmailAutomation,
  success: disableEmailAutomationSuccess,
  fail: disableEmailAutomationFail,
} = createAsyncFormEditorAction('DISABLE_EMAIL_AUTOMATION')

const {
  action: activateGoogleSheetsIntegration,
  success: activateGoogleSheetsIntegrationSuccess,
  fail: activateGoogleSheetsIntegrationFail,
} = createAsyncFormEditorAction('ACTIVATE_GOOGLE_SHEETS_INTEGRATION')

const {
  action: disableGoogleSheetsIntegration,
  success: disableGoogleSheetsIntegrationSuccess,
  fail: disableGoogleSheetsIntegrationFail,
} = createAsyncFormEditorAction('DISABLE_GOOGLE_SHEETS_INTEGRATION')

export {
  unpublishForm,
  unpublishFormSuccess,
  unpublishFormFail,
  saveChanges,
  saveChangesSuccess,
  saveChangesFail,
  setFormEditorSubmitting,
  initFormEditor,
  initFormEditorSuccess,
  initFormEditorFail,
  publishForm,
  publishFormSuccess,
  publishFormFail,
  selectFormField,
  addFormField,
  deleteFormField,
  setFieldProperty,
  setAfterSubmitProperty,
  setOpeningScreenProperty,
  setMainButtonStyleProperty,
  setMainTitleStyleProperty,
  setMainDescriptionStyleProperty,
  setFieldInputStyleProperty,
  setFieldTitleStyleProperty,
  setFields,
  setFormBackgroundProperty,
  setFormBackgroundFilter,
  setQuestionOptionProperty,
  setFormAfterSubmitStyleProperty,
  setFormOpeningScreenStyleProperty,
  resetFormEditor,
  activateEmailAutomation,
  activateEmailAutomationSuccess,
  activateEmailAutomationFail,
  activateGoogleSheetsIntegration,
  activateGoogleSheetsIntegrationSuccess,
  activateGoogleSheetsIntegrationFail,
  disableEmailAutomation,
  disableEmailAutomationSuccess,
  disableEmailAutomationFail,
  disableGoogleSheetsIntegration,
  disableGoogleSheetsIntegrationSuccess,
  disableGoogleSheetsIntegrationFail,
}
