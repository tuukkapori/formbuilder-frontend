import { CircularProgress } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthListener } from '../../utils/hooks'

const ProtectedRoute = ({ children }: any) => {
  const [loggedIn, checkingStatus] = useAuthListener()

  if (checkingStatus) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    )
  }
  if (!loggedIn) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to="/login">Go to login</Link>
      </div>
    )
  }
  return (
    <>
      {checkingStatus ? (
        <div>loading...</div>
      ) : loggedIn ? (
        children
      ) : (
        <div>log in</div>
      )}
    </>
  )
}

export default ProtectedRoute
