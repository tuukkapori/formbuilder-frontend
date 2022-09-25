import { createAction } from 'redux-actions'

const createNotificationAction = (type: string) =>
  createAction(`NOTIFICATION/${type}`) as any

const successNotification = createNotificationAction('SUCCESS')

const infoNotification = createNotificationAction('INFO')

const errorNotification = createNotificationAction('ERROR')

const closeNotification = createNotificationAction('CLOSE')

export {
  successNotification,
  infoNotification,
  errorNotification,
  closeNotification,
}
