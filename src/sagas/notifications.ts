import { put, all, takeLatest, delay } from 'redux-saga/effects'
import {
  closeNotification,
  errorNotification,
  infoNotification,
  successNotification,
} from '../actions/notifications'

export function* handleAutoCloseNotification() {
  yield delay(5000)
  yield put(closeNotification())
}

export function* watchNotificationsActions() {
  yield all([
    takeLatest(
      [infoNotification, successNotification, errorNotification],
      handleAutoCloseNotification
    ),
  ])
}
