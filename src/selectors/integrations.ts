import { createSelector } from 'reselect'

const selectIntegrationsDomain = (state: any) => state.integrations

const selectGoogleSheetsAccounts = createSelector(
  selectIntegrationsDomain,
  (integrations) => integrations.googleSheetsAccounts
)

export { selectGoogleSheetsAccounts }
