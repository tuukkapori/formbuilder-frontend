import { handleActions } from 'redux-actions'
import type { Reducer } from '@reduxjs/toolkit'
import {
  closeNotification,
  errorNotification,
  infoNotification,
  successNotification,
} from '../actions/notifications'
import { NotificationsState } from '../types/state'

const initialState = {
  open: false,
  message: undefined,
  type: 'info',
} as NotificationsState

const NotificationsReducer = handleActions<NotificationsState, any>(
  {
    [closeNotification]: (state) => ({
      ...state,
      open: false,
      message: undefined,
      type: undefined,
    }),
    [successNotification]: (state, { payload: message }) => ({
      ...state,
      open: true,
      message,
      type: 'success',
    }),
    [infoNotification]: (state, { payload: message }) => ({
      ...state,
      open: true,
      message,
      type: 'info',
    }),
    [errorNotification]: (state, { payload: message }) => ({
      ...state,
      open: true,
      message,
      type: 'error',
    }),
  },
  initialState
) as Reducer

export default NotificationsReducer
