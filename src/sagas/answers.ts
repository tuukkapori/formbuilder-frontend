import { Action } from 'redux'
import { put, all, takeEvery, call } from 'redux-saga/effects'
import {
  getAnswersForForm,
  getAnswersForFormFail,
  getAnswersForFormSuccess,
} from '../actions/forms'

import API from '../services/forms'

export function* handleGetAnwersForForm({
  payload: formId,
}: any): Generator<Action, void, string> {
  try {
    const answers = yield call(API.getAnwersForForm, formId)
    const ansObject = {
      formId,
      answers: (answers as any)
        .map((ans: any) => ans.answers)
        .filter((ans: any) => ans !== undefined),
    }
    yield put(getAnswersForFormSuccess({ formId, answers: ansObject }))
  } catch (error) {
    yield put(getAnswersForFormFail())
  }
}

export function* watchAnswersActions() {
  yield all([takeEvery(getAnswersForForm, handleGetAnwersForForm)])
}
