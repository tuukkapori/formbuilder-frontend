import { Box } from '@mui/system'
import React from 'react'

interface TabPanelProps {
  children: any
  value: number
  index: number
}

const TabPanel = ({ value, index, children }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default TabPanel
