import { Action } from 'redux'
import { put, all, takeEvery, call, takeLatest } from 'redux-saga/effects'
import {
  createFormFail,
  createFormSuccess,
  deleteForm,
  deleteFormFail,
  deleteFormSuccess,
  getAnswersForForm,
  getAnswersForFormFail,
  getAnswersForFormSuccess,
  getForm,
  getFormFail,
  getForms,
  getFormsFail,
  getFormsSuccess,
  getFormSuccess,
  setSubmitting,
  createForm,
} from '../actions/forms'
import {
  errorNotification,
  infoNotification,
  successNotification,
} from '../actions/notifications'
import API from '../services/api'
import { createFormUtil } from '../utils/forms'

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
}: {
  payload: string
}): Generator<Action, void, string> {
  try {
    const form = yield call(API.GET, '/forms/' + formId)
    yield put(getFormSuccess({ formId, form }))
  } catch (error: any) {
    yield put(getFormFail(error.message))
  }
}

export function* handleCreateForm({
  payload: { name, template },
}: {
  payload: { name: string; template: string }
}): Generator<Action, void, any> {
  try {
    yield put(setSubmitting(true))
    const initialForm = yield call(createFormUtil, name, template)
    console.log('initial form ', initialForm)
    const { formId, form } = yield call(API.POST, '/forms', {
      form: initialForm,
    })
    yield put(createFormSuccess({ formId, form }))
  } catch (error) {
    yield put(createFormFail())
  }
  yield put(setSubmitting(false))
}

export function* handleDeleteForm({ payload: formId }: { payload: string }) {
  try {
    yield put(infoNotification('Deleting form...'))

    yield put(setSubmitting(true))
    yield call(API.DELETE, `/forms/${formId}`)

    yield put(deleteFormSuccess(formId))
    yield put(successNotification('Form deleted!'))
  } catch (error) {
    yield put(errorNotification('Form deletion failed'))
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
      answers,
    }
    yield put(getAnswersForFormSuccess({ formId, answers: ansObject }))
  } catch (error) {
    yield put(getAnswersForFormFail())
  }
}

export function* watchFormsActions() {
  yield all([
    takeEvery(getAnswersForForm, handleGetAnwersForForm),
    takeLatest(getForms, handleGetForms),
    takeEvery(getForm, handleGetForm),
    takeEvery(createForm, handleCreateForm),
    takeEvery(deleteForm, handleDeleteForm),
  ])
}
