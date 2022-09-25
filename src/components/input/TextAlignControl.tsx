import React from 'react'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import { ButtonGroup, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface TextAlignControlProps {
  value: string
  onChange: (value: string) => void
}
const TextAlignControl = ({ value, onChange }: TextAlignControlProps) => {
  console.log('text alin va ', value)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>Text align</Typography>
      <ButtonGroup>
        <IconButton
          color={value === 'start' ? 'primary' : undefined}
          onClick={() => onChange('start')}
        >
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton
          color={value === 'center' ? 'primary' : undefined}
          onClick={() => onChange('center')}
        >
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton
          color={value === 'end' ? 'primary' : undefined}
          onClick={() => onChange('end')}
        >
          <FormatAlignRightIcon />
        </IconButton>
      </ButtonGroup>
    </Box>
  )
}

export default TextAlignControl
