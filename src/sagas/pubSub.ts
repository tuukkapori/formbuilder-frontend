import { Action } from 'redux'
import { put, all, takeEvery, call } from 'redux-saga/effects'
import { io } from 'socket.io-client'
import {
  initPubSub,
  initPubSubFail,
  initPubSubSuccess,
  openGoogleAuthWindow,
  pubSubMessage,
  unsubPubSub,
  unsubPubSubFail,
  unsubPubSubSuccess,
} from '../actions/pubSub'
import { getStore } from '../configureStore'
import {
  getAuthToken,
  getFirebaseUserId,
  getIdBearerToken,
} from '../services/firebase/auth'
import { addGoogleSheetsAccount } from '../actions/integrations'
import { newAnswerFromSubsub } from '../actions/answers'
const pubSubUrl = process.env.REACT_APP_PUBSUB_URL || ''

let socket: any
let authWindow: any

export function* handleInitPubSub(): Generator<Action, void, any> {
  try {
    const authToken = yield call(getIdBearerToken)

    socket = io(pubSubUrl, {
      auth: {
        authToken,
      },
    })
    console.log('socket connected')
    socket.on('googleAuth', (message: any) => {
      console.log('googleauth message')
      if (authWindow) {
        authWindow.close()
      }
      getStore().dispatch(addGoogleSheetsAccount(message))
    })
    socket.on('submission', (submission: any) => {
      const payload = {
        formId: submission.formId,
        submission: {
          submittedAt: submission.submittedAt,
          ...submission.answers,
        },
      }
      getStore().dispatch(newAnswerFromSubsub(payload))
    })
    yield put(initPubSubSuccess())
  } catch (error: any) {
    console.log('Error initing pubsub ', error.message)
    yield put(initPubSubFail())
  }
}

export function* handleUnsubPubsub() {
  try {
    if (socket) {
      socket.off('submission')
      socket.off('googleAuth')
      socket = undefined
    }
    yield put(unsubPubSubSuccess())
  } catch (error) {
    yield put(unsubPubSubFail())
  }
}

export function* handleOpenGoogleAuthWindow(): Generator<Action, void, any> {
  const userId = yield call(getFirebaseUserId)
  const authToken = yield call(getAuthToken)
  const testUrl = `${process.env.REACT_APP_PUBLIC_API_URL}/googleAuth?userId=${userId}&authToken=${authToken}`
  authWindow = window.open(testUrl, '_blank')
  yield put({ type: 'OPENWINDOWSUCCESS' })
}

export function* handlePubSubMessage({ payload }: any) {
  const { type, data } = payload
  if (type === 'authSuccess') {
    if (authWindow) {
      yield put(addGoogleSheetsAccount(data))
      authWindow.close()
    }
    console.log('message data ', data)
  }
  yield put({ type: 'success' })
}

export function* watchPubSubActions() {
  yield all([
    takeEvery(initPubSub, handleInitPubSub),
    takeEvery(openGoogleAuthWindow, handleOpenGoogleAuthWindow),
    takeEvery(pubSubMessage, handlePubSubMessage),
    takeEvery(unsubPubSub, handleUnsubPubsub),
  ])
}
