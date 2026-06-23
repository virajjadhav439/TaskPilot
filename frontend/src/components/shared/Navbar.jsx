import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

const handleLogout = () => {
  logout()
  navigate("/login")
}
  return (<>
    <nav className='fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50'>
    <div className='flex items-center justify-between px-6 py-4 rounded-2xl bg-white/50 backdrop-blur-md border shadow-lg'>
    {/* logo */}
    <Link to='/'>
    <h1 className='text-xl font-bold'>TaskPilot</h1>
    </Link>
    {/* navigation */}
    <div className='flex gap-8 overflow-auto ml-10 mr-10'>
        <Link className="text-gray-600 hover:text-black transition-colors font-medium" to='/dashboard'>Dashboard</Link>
        <Link className="text-gray-600 hover:text-black transition-colors font-medium" to='/analytics' >Analytics</Link>
        <Link className="text-gray-600 hover:text-black transition-colors font-medium" to='/profile'>Profile</Link>
    </div>
    {/* logout */}
    <button className='bg-zinc-800 text-white px-4 py-2 rounded-full hover:bg-black transition-all duration-300 cursor-pointer'
    onClick={handleLogout}>
    Logout
    </button>
    </div>
    </nav>
  </>
  )
}

export default Navbar