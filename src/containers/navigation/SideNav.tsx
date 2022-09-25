import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  BoxProps,
} from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import FestivalIcon from '@mui/icons-material/Festival'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Link, useLocation } from 'react-router-dom'
import NavLink from '../../components/common/NavLink'

const SideNav = (props: BoxProps) => {
  const { pathname } = useLocation()
  return (
    <Box
      id="sidenav"
      sx={[
        {
          bgcolor: 'background.componentBg',
          borderRight: '1px solid grey',
          borderColor: 'divider',
          height: '91vh',
          width: '150px',
          display: {
            xs: 'none',
            md: 'initial',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <List>
        <ListItem sx={{ width: '100%' }}>
          <NavLink to="/forms/create">
            <Typography>+ create form</Typography>
          </NavLink>
        </ListItem>
      </List>
    </Box>
  )
}

export default SideNav
