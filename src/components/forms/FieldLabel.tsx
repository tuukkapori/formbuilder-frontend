import { Typography } from '@mui/material'
import React from 'react'
import { FormField } from '../../types/forms'

interface FieldLabelProps {
  field: FormField
}

const FieldLabel = ({
  field: { title, description, required },
}: FieldLabelProps) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex' }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {required && (
          <Typography variant="body1" sx={{ fontWeight: 300 }}>
            &nbsp; (required)
          </Typography>
        )}
      </div>
      {description && (
        <Typography style={{ filter: 'opacity(0.7)' }}>
          {description}
        </Typography>
      )}
    </div>
  )
}

export default FieldLabel
