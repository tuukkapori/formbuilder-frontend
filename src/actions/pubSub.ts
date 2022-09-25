import { createAction } from 'redux-actions'

const createPubSubAction = (type: string) =>
  createAction(`PUBSUB/${type}`) as any

const createAsyncPubSubAction = (action: string) => ({
  action: createAction(`PUBSUB/${action}`) as any,
  success: createAction(`PUBSUB/${action}_SUCCESS`) as any,
  fail: createAction(`PUBSUB/${action}_FAIL`) as any,
})

const {
  action: initPubSub,
  success: initPubSubSuccess,
  fail: initPubSubFail,
} = createAsyncPubSubAction('INIT')

const {
  action: unsubPubSub,
  success: unsubPubSubSuccess,
  fail: unsubPubSubFail,
} = createAsyncPubSubAction('UNSUB')

const openGoogleAuthWindow = createPubSubAction('OPEN_GOOGLE_AUTH_WINDOW')

const pubSubMessage = createPubSubAction('PUBSUB_MESSAGE')

export {
  initPubSub,
  initPubSubSuccess,
  initPubSubFail,
  openGoogleAuthWindow,
  pubSubMessage,
  unsubPubSub,
  unsubPubSubSuccess,
  unsubPubSubFail,
}
