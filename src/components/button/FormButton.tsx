import { Button } from '@mui/material'
import React from 'react'

const FormButton = (props: any) => {
  return (
    <Button
      {...props}
      sx={{
        bgcolor: props.variant === 'text' ? 'none' : props.styles.background,
        color: props.styles.color,
        transitionDuration: '200ms',
        fontSize: props.styles.fontSize,
        fontWeight: props.styles.fontWeight || 400,
        fontFamily: props.styles.fontFamily,
        borderRadius: '10px',
        padding: '9px 20px 9px 20px',
        '&:hover': {
          bgcolor: props.variant === 'text' ? 'none' : props.styles.background,
          filter: 'brightness(0.8)',
        },
        '&:focus': {
          bgcolor: props.variant === 'text' ? 'none' : props.styles.background,
          filter: 'brightness(0.8)',
        },
      }}
    >
      {props.children}
    </Button>
  )
}

export default FormButton
