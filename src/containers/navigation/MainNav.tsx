import React from 'react'
import { Box, Avatar } from '@mui/material'
import { getFirebaseAuth } from '../../services/firebase/app'

const MainNav = () => {
  const handleLogout = async () => {
    const auth = getFirebaseAuth()
    await auth.signOut()
    console.log('logged out')
  }
  return (
    <Box
      style={{
        border: '1px solid rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 50px 0px 50px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1>Form builder</h1>
      </div>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Avatar onClick={handleLogout}>A</Avatar>
      </Box>
    </Box>
  )
}

export default MainNav
