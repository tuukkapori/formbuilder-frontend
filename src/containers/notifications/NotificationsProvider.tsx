import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeNotification } from '../../actions/notifications'
import {
  selectNotificationMessage,
  selectNotificationOpen,
  selectNotificationType,
} from '../../selectors/notifications'

const NotificationsProvider = ({ children }: any) => {
  const dispatch = useDispatch()
  const open = useSelector(selectNotificationOpen)
  const message = useSelector(selectNotificationMessage)
  const type = useSelector(selectNotificationType)
  const handleClose = () => dispatch(closeNotification())
  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}

export default NotificationsProvider
