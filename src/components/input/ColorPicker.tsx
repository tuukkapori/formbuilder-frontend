import React, { useState } from 'react'
import { IconButton, Popover, Tooltip, Typography } from '@mui/material'
import { SketchPicker } from 'react-color'
import ColorizeIcon from '@mui/icons-material/Colorize'
import rgbHex from 'rgb-hex'

const aicBrandColors = [
  '#F4F1E8',
  '#1C5266',
  '#B8DFEE',
  '#41508D',
  '#000000',
  'rgba(255, 255, 255, 1)',
]

interface ColorPickerProps {
  color: string
  onChange: (value: any) => void
  label?: string
  tooltip?: string
  mb?: number
}

const ColorPicker = ({
  label,
  tooltip,
  color,
  onChange,
  mb,
}: ColorPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [selectedColor, setSelectedColor] = useState(color)

  const handleChange = (c: any) => {
    const formatted = '#' + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a)
    setSelectedColor(formatted)
    onChange(formatted)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: mb }}>
        <Tooltip title={tooltip || ''}>
          <IconButton
            onClick={(e) => setAnchorEl(e.target)}
            sx={{ background: color }}
          >
            <ColorizeIcon />
          </IconButton>
        </Tooltip>
        {label && <Typography sx={{ pl: 1.5 }}>{label}</Typography>}
      </div>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SketchPicker
          presetColors={aicBrandColors}
          color={selectedColor}
          onChange={handleChange}
        />
      </Popover>
    </>
  )
}

export default ColorPicker
