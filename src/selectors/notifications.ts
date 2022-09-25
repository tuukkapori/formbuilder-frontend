import { createSelector } from 'reselect'

const selectNotificationsDomain = (state: any) => state.notifications

const selectNotificationOpen = createSelector(
  selectNotificationsDomain,
  (notifications) => notifications.open
)

const selectNotificationMessage = createSelector(
  selectNotificationsDomain,
  (notifications) => notifications.message
)

const selectNotificationType = createSelector(
  selectNotificationsDomain,
  (notifications) => notifications.type
)

export {
  selectNotificationOpen,
  selectNotificationMessage,
  selectNotificationType,
}
