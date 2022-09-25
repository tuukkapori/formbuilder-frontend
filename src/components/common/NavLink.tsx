import React from 'react'
import { Link } from 'react-router-dom'

interface NavLinkProps {
  to: string
  children: JSX.Element
}

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      {children}
    </Link>
  )
}

export default NavLink
