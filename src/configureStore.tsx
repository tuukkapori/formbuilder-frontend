import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import formsReducer from './reducers/forms'
import rootSaga from './sagas'
import notificationsReducer from './reducers/notifications'
import mediaReducer from './reducers/media'
import formEditorReducer from './reducers/formEditor'
import integrationsReducer from './reducers/integrations'
const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
  reducer: {
    media: mediaReducer,
    notifications: notificationsReducer,
    forms: formsReducer,
    formEditor: formEditorReducer,
    integrations: integrationsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).prepend(sagaMiddleWare)
  },
})
sagaMiddleWare.run(rootSaga)

export const getStore = () => store
