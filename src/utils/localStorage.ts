const getGoogleSheetsAccountsFromLocalStorage = () => {
  const accounts = window.localStorage.getItem('googleSheetsAccounts')
  if (accounts) {
    return JSON.parse(accounts)
  } else {
    return []
  }
}

const addGoogleSheetsAccountToLocalStorage = (account: any) => {
  const accounts = window.localStorage.getItem('googleSheetsAccounts')
  if (accounts) {
    const accountsJson = JSON.parse(accounts)
    if (accountsJson.some((a: any) => a.id === account.id)) {
      return false
    }

    window.localStorage.setItem(
      'googleSheetsAccounts',
      JSON.stringify([...accountsJson, account])
    )
    return true
  } else {
    window.localStorage.setItem(
      'googleSheetsAccounts',
      JSON.stringify([account])
    )
    return true
  }
}

const deleteGoogleSheetsAccountFromLocalStorage = (accountId: string) => {
  const accounts = window.localStorage.getItem('googleSheetsAccounts')
  if (accounts) {
    const filteredAccounts = JSON.parse(accounts).filter(
      (acc: any) => acc.id !== accountId
    )
    window.localStorage.setItem('googleSheetsAccounts', filteredAccounts)
  }
}

export {
  getGoogleSheetsAccountsFromLocalStorage,
  addGoogleSheetsAccountToLocalStorage,
  deleteGoogleSheetsAccountFromLocalStorage,
}
