import { Button, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../../services/firebase/auth'
import AIClogo from '../../images/AIC_logo_black.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async () => {
    setSubmitting(true)
    await signIn(email, password)
    navigate('/forms')
  }
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.5,
          p: 3,
          width: '300px',
        }}
      >
        <img
          src={AIClogo}
          style={{ width: '80px', height: '80px' }}
          alt="logo"
        />
        <TextField
          variant="standard"
          value={email}
          fullWidth
          type="email"
          label="Email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <TextField
          variant="standard"
          value={password}
          fullWidth
          type="password"
          label="Password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} variant="contained" disabled={submitting}>
          LOGIN
        </Button>
      </Paper>
    </Box>
  )
}

export default Login
