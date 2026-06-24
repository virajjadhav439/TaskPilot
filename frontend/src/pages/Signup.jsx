import { signupUser } from '@/services/authApi'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react"

const Signup = () => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit =  async (e)=>{
    try {
      e.preventDefault()
      
      const response = await signupUser({name,email,password})
      toast.success('Signup Successful,Please Login')
      navigate('/login')

    } catch (error) {
      console.log(error);
      toast.error("Signup Failed")
    }
  }

  return (
    <>
    {/* signup Page */}
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
      {/* signup Container */}
      <div className='bg-white border rounded-2xl shadow-lg p-8 w-full max-w-md'>
        {/* SignUp Heading */}
        <h1 className='text-3xl font-bold'>Create Account</h1>
        {/* Signup SubHeading */}
        <h3 className='text-gray-500 mt-2 mb-6'>Increase your Productivity with Us!</h3>
        {/* Signup Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'/>
          <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'/>
          {/* Visible password */}
          <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeholder="Enter Password"
    className="
      w-full
      border
      rounded-xl
      p-3
      pr-12
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-gray-500
    "
  >
    {showPassword
      ? <EyeOff size={18}/>
      : <Eye size={18}/>
    }
  </button>

</div>
          <button type='submit' className='w-full bg-zinc-800 text-white py-3 rounded-xl hover:bg-black transition-al duration-300 ease-in-out'>Signup</button>
        </form>
        <p className='text-center mt-6 text-gray-600'>Already have a account?
<Link to='/login' className='font-medium text-black hover:underline fade-in'>
      Login
</Link>
    </p>
      </div>
    </div>
    </>
  )
}

export default Signup