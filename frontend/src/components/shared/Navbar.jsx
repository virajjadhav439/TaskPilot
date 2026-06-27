import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

const Navbar = () => {
  const { logout,isAuthenticated } = useContext(AuthContext)
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
    {isAuthenticated && (
  <div className="flex gap-8 overflow-auto ml-2.5 mr-2.5">

    <Link
      className="text-gray-600 hover:text-black transition-colors font-medium"
      to="/calendar"
    >
      Calendar
    </Link>

    <Link
      className="text-gray-600 hover:text-black transition-colors font-medium"
      to="/dashboard"
    >
      Dashboard
    </Link>

    <Link
      className="text-gray-600 hover:text-black transition-colors font-medium"
      to="/analytics"
    >
      Analytics
    </Link>

    <Link
      className="text-gray-600 hover:text-black transition-colors font-medium"
      to="/profile"
    >
      Profile
    </Link>

  </div>
)}
{/* if not logged in show Signup and if logged in show logout */}

{isAuthenticated ? (

    // Logout Dialog
    <Dialog>
  <DialogTrigger asChild>
    <button className='bg-zinc-800 text-white px-4 py-2 rounded-full hover:bg-black transition-all duration-300 cursor-pointer'
    >
    Logout
    </button>
  </DialogTrigger>

<DialogContent>
  <DialogHeader>
    <DialogTitle className={'text-2xl'}>
      Are You Sure?
    </DialogTitle>
  </DialogHeader>
  <div className='gap-2 space-x-2'>
  <button className='border border-black bg-zinc-800 text-white px-4 py-2 rounded-full hover:bg-black transition-all duration-300 cursor-pointer'
    onClick={handleLogout}
    >
    Logout
    </button>
    <DialogClose asChild>
    <button className='border border-black rounded-2xl px-4 py-2 text-zinc-800 
  hover:text-white hover:bg-black hover:transition-all hover:duration-300'>
    Cancel
    </button>
    </DialogClose>

  </div>
</DialogContent>
</Dialog>

) : (

     <div className="flex gap-3">

    <Link
      to="/login"
      className="bg-zinc-800 text-white px-3 md:px-4 py-1 md:py-2 rounded-full hover:bg-black transition-all duration-300"
    >
      Login
    </Link>

    <Link
      to="/signup"
      className="bg-white text-zinc-800 px-3 md:px-4 py-1 md:py-2 rounded-full hover:bg-black hover:text-white hover:scale-102 transition-all duration-300"
    >
      Get Started
    </Link>

  </div>

)}
    

    </div>
    </nav>
  </>
  )
}

export default Navbar