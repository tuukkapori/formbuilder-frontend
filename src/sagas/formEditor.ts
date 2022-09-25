import { Action } from 'redux'
import { put, all, takeEvery, call, select } from 'redux-saga/effects'
import {
  initFormEditor,
  activateEmailAutomation,
  activateEmailAutomationFail,
  activateEmailAutomationSuccess,
  initFormEditorFail,
  initFormEditorSuccess,
  publishFormFail,
  publishFormSuccess,
  saveChangesFail,
  saveChangesSuccess,
  unpublishFormFail,
  unpublishFormSuccess,
  setFormEditorSubmitting,
  activateGoogleSheetsIntegrationSuccess,
  activateGoogleSheetsIntegration,
  disableEmailAutomation,
  disableEmailAutomationSuccess,
  disableEmailAutomationFail,
  disableGoogleSheetsIntegration,
  disableGoogleSheetsIntegrationSuccess,
  disableGoogleSheetsIntegrationFail,
  publishForm,
  unpublishForm,
  saveChanges,
} from '../actions/formEditor'
import {
  deleteFormFail,
  deleteFormSuccess,
  getAnswersForFormFail,
  getAnswersForFormSuccess,
  getFormFail,
  getFormsFail,
  getFormsSuccess,
  getFormSuccess,
  setSubmitting,
} from '../actions/forms'
import {
  successNotification,
  infoNotification,
  errorNotification,
} from '../actions/notifications'
import { getEditorFormIntegrations } from '../actions/integrations'
import { selectFormById } from '../selectors/forms'
import { selectEditorForm } from '../selectors/formEditor'
import API from '../services/api'
import IntegrationsAPI from '../services/integrations'
import { getGoogleSheetsAccounts } from '../actions/integrations'

export function* handleGetForms(): Generator<Action, void, any> {
  try {
    yield put(setSubmitting(true))

    const forms = yield call(API.GET, '/forms')

    yield put(getFormsSuccess(forms))
  } catch (error) {
    yield put(getFormsFail())
  }
  yield put(setSubmitting(false))
}

export function* handleGetForm({
  payload: formId,
}: any): Generator<Action, void, string> {
  try {
    const form = yield call(API.GET, `/forms/${formId}`)
    yield put(getFormSuccess({ formId, form }))
  } catch (error: any) {
    yield put(getFormFail(error.message))
  }
}

export function* handleDeleteForm({ payload: formId }: any) {
  try {
    yield put(setSubmitting(true))

    yield call(API.DELETE, `/forms/${formId}`)
    yield put(deleteFormSuccess(formId))
  } catch (error) {
    yield put(deleteFormFail())
  }
  yield put(setSubmitting(false))
}

export function* handleGetAnwersForForm({
  payload: formId,
}: any): Generator<Action, void, any> {
  try {
    const answers = yield call(API.GET, `/answers/${formId}`)
    const ansObject = {
      formId,
      answers: (answers as any)
        .map((ans: any) => ans.answers)
        .filter((ans: any) => ans !== undefined),
    }
    yield put(getAnswersForFormSuccess(ansObject))
  } catch (error) {
    yield put(getAnswersForFormFail())
  }
}

export function* handlePublishForm({
  payload: formId,
}: any): Generator<Action, any, any> {
  try {
    yield put(infoNotification('Publishing form...'))
    const editorForm = yield select(selectEditorForm)

    const publishedForm = {
      ...editorForm,
      status: 'open',
    }
    yield call(API.PUT, `/forms/${formId}`, {
      form: publishedForm,
    })
    yield put(publishFormSuccess())
    yield put(successNotification('Form published'))
  } catch (error) {
    yield put(publishFormFail())
    yield put(errorNotification('Publishing form failed'))
  }
}

export function* handleUnpublishForm({
  payload: formId,
}: any): Generator<Action, any, any> {
  try {
    yield put(infoNotification('Unpublishing form...'))
    const editorForm = yield select(selectEditorForm)

    const unpublishedForm = {
      ...editorForm,
      status: 'closed',
    }
    yield call(API.PUT, `/forms/${formId}`, {
      form: unpublishedForm,
    })

    yield put(successNotification('Form unpublished!'))
    yield put(unpublishFormSuccess())
  } catch (error) {
    yield put(unpublishFormFail())
    yield put(errorNotification('Error unpublishing form!'))
  }
}

export function* handleSaveFormChanges({
  payload: formId,
}: any): Generator<Action, any, string> {
  try {
    yield put(infoNotification('Saving form changes...'))
    yield put(setSubmitting(true))

    const form = yield select(selectEditorForm as any)
    yield call(API.PUT, `/forms/${formId}`, { form })
    yield put(saveChangesSuccess())
    yield put(successNotification('Form saved successfully!'))
  } catch (error) {
    yield put(saveChangesFail())
    yield put(
      errorNotification(
        'Error happened while saving form. Changes are not saved.'
      )
    )
  }
  yield put(setSubmitting(false))
}

export function* handleInitEditor({
  payload: formId,
}: any): Generator<Action, any, string> {
  try {
    const formFromState = yield select(selectFormById(formId) as any)
    const integrations = yield call(API.GET, `/integrations/${formId}`)
    if (formFromState) {
      yield put(initFormEditorSuccess({ form: formFromState, integrations }))
    } else {
      const form = yield call(API.GET, `/forms/${formId}`)
      yield put(initFormEditorSuccess({ form, integrations }))
    }

    yield put(getGoogleSheetsAccounts())
  } catch (error) {
    yield put(initFormEditorFail())
  }
}

export function* handleActivateEmailAutomation({ payload: values }: any) {
  try {
    yield put(setFormEditorSubmitting(true))
    yield put(infoNotification('Activating Email automation...'))
    const {
      mailerliteGroupId,
      maxCapacity,
      fieldIdForEmail,
      fieldIdForName,
      formId,
    } = values
    yield call(
      IntegrationsAPI.activateEmailAutomation,
      formId,
      mailerliteGroupId,
      maxCapacity,
      fieldIdForEmail,
      fieldIdForName
    )
    yield put(activateEmailAutomationSuccess())
    yield put(successNotification('Email automation activated!'))
    yield put(getEditorFormIntegrations(formId))
  } catch (error) {
    yield put(activateEmailAutomationFail())
    yield put(errorNotification('FAILED: email not actived'))
  }
  yield put(setFormEditorSubmitting(false))
}

export function* handleDisableEmailAutomation({ payload: formId }: any) {
  try {
    yield put(setFormEditorSubmitting(true))
    yield put(infoNotification('Disabling Email automation...'))

    yield call(IntegrationsAPI.disableEmailAutomation, formId)
    yield put(disableEmailAutomationSuccess())
    yield put(successNotification('Email automation disabled!'))
    yield put(getEditorFormIntegrations(formId))
  } catch (error) {
    yield put(disableEmailAutomationFail())
    yield put(errorNotification('FAILED: email not disabled'))
  }
  yield put(setFormEditorSubmitting(false))
}

export function* handleActivateGoogleSheetsIntegration({
  payload: values,
}: any) {
  try {
    yield put(setFormEditorSubmitting(true))
    yield put(infoNotification('Activating Google Sheets integration...'))
    const { formId, spreadSheetName, googleUserId } = values
    console.log('values ', values)

    yield call(API.POST, `/integrations/${formId}/activateSheetsIntegration`, {
      spreadSheetName,
      googleUserId,
    })

    yield put(getEditorFormIntegrations(formId))

    yield put(activateGoogleSheetsIntegrationSuccess())
    yield put(successNotification('Google Sheets integration activated!'))
  } catch (error) {
    yield put(activateEmailAutomationFail())
    yield put(errorNotification('Google Sheets integration failed'))
  }
  yield put(setFormEditorSubmitting(false))
}

export function* handleDisableGoogleSheetsIntegration({
  payload: formId,
}: any) {
  try {
    yield put(setFormEditorSubmitting(true))
    yield put(infoNotification('Disabling Google Sheets integration...'))
    yield call(API.POST, `/integrations/${formId}/disableSheetsIntegration`)

    yield put(getEditorFormIntegrations(formId))
    yield put(successNotification('Google sheets integration disabled!'))

    yield put(disableGoogleSheetsIntegrationSuccess())
  } catch (error) {
    yield put(disableGoogleSheetsIntegrationFail())
    yield put(errorNotification('Disabling google sheets integration failed'))
  }
  yield put(setFormEditorSubmitting(false))
}

export function* watchFormEditorActions() {
  yield all([
    takeEvery(initFormEditor, handleInitEditor),
    takeEvery(publishForm, handlePublishForm),
    takeEvery(unpublishForm, handleUnpublishForm),
    takeEvery(saveChanges, handleSaveFormChanges),
    takeEvery(activateEmailAutomation, handleActivateEmailAutomation),
    takeEvery(disableEmailAutomation, handleDisableEmailAutomation),
    takeEvery(
      activateGoogleSheetsIntegration,
      handleActivateGoogleSheetsIntegration
    ),
    takeEvery(
      disableGoogleSheetsIntegration,
      handleDisableGoogleSheetsIntegration
    ),
  ])
}
