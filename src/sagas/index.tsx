import { all } from 'redux-saga/effects'
import { watchFormEditorActions } from './formEditor'
import { watchFormsActions } from './forms'
import { watchMediaActions } from './media'
import { watchNotificationsActions } from './notifications'
import { watchIntegrationsActions } from './integrations'
import { watchPubSubActions } from './pubSub'

export default function* rootSaga() {
  yield all([
    watchFormsActions(),
    watchFormEditorActions(),
    watchNotificationsActions(),
    watchMediaActions(),
    watchPubSubActions(),
    watchIntegrationsActions(),
  ])
}
