import React from 'react'
import { Outlet } from 'react-router'
import MainNav from './MainNav'

const Navigation = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MainNav />
      <div id="main-view">
        <Outlet />
      </div>
    </div>
  )
}

export default Navigation
