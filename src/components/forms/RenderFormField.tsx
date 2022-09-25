import { TextField, Paper, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

const RenderFormField = ({
  field,
  value,
  onChange,
  onFocus,
  styles,
  ...rest
}: any) => {
  const inputColor = styles?.fields?.input?.color || 'white'
  const inputFontFamily = styles?.fields.input?.fontFamily || 'Montserrat'
  return (
    <AnimatePresence>
      {(field.type === 'textShort' ||
        field.type === 'textLong' ||
        field.type === 'email') && (
        <TextField
          {...rest}
          value={value}
          multiline={field.type === 'textLong'}
          rows={field.type === 'textLong' ? 3 : 1}
          type={field.type === 'email' ? 'email' : 'text'}
          onChange={onChange}
          variant="standard"
          color="neutral"
          sx={{
            '& .MuiInput-underline:before': { borderBottomColor: inputColor },
            '& .MuiInput-underline:after': { borderBottomColor: inputColor },
            '&:hover': {
              '& .MuiInput-underline:before': { borderBottomColor: inputColor },
              '& .MuiInput-underline:after': { borderBottomColor: inputColor },
            },
            color: 'white',
            fontFamily: inputFontFamily,
            maxWidth: '90vw',
            input: {
              color: inputColor,
              maxWidth: '90vw',
              fontSize: '30px',
              fontFamily: inputFontFamily,
            },
          }}
        />
      )}
      {field.type === 'selectOne' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            width: '40%',
            marginTop: 20,
          }}
          {...rest}
        >
          {field.options &&
            field.options.map((option: any) => {
              return (
                <Paper
                  sx={{
                    minWidth: '250px',
                    background: styles.fields.options.background,
                    transitionDuration: '200ms',
                    filter:
                      value && value !== option ? 'brightness(0.6)' : 'none',
                    p: 1,
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      filter: 'brightness(1.2)',
                    },
                    minHeight: '25px',
                    boxShadow:
                      value === option
                        ? `0px 0px 4px 2px ${styles.fields.options.selectedBackground}`
                        : 'none',
                  }}
                  key={option}
                  onClick={() => {
                    onChange(option)
                  }}
                >
                  <Typography sx={{ color: styles.fields.options.color }}>
                    {option}
                  </Typography>
                </Paper>
              )
            })}
        </div>
      )}
    </AnimatePresence>
  )
}

export default RenderFormField
