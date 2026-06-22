import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (<>
    <nav>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/analytics' >Analytics</Link>
      <Link to='/profile'>Profile</Link>
    </nav>
  </>
  )
}

export default Navbar