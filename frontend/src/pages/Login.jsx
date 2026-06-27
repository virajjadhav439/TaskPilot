
import useAuth from '@/hooks/useAuth'
import { googleLogin, loginUser } from '@/services/authApi'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react"
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState('')
    const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {login} = useAuth()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await loginUser({email,password})
      login(response.data.user,response.data.token)
      toast.success('Login Successful')
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
      toast.error('Login Failed')
    }
  }
  const handleGoogleLogin = async(credentialResponse)=>{
    const response= await googleLogin({
      credential:credentialResponse.credential
    })
    login(response.data.user,response.data.token)
      toast.success('Login Successful')
      navigate('/dashboard')
    
  }
  return (<>
  {/* login page */}
  <div className='min-h-screen bg-card flex items-center justify-center px-6'>
    {/* login container */}
    <div className='bg-card border rounded-2xl shadow-lg p-8 w-full max-w-md'>
      {/* login heading */}
      <h1 className='text-3xl font-bold'> Welcome Back</h1>
      {/* login subheading */}
      <h3 className='text-muted-foreground mt-2 mb-6'>Login to continue your productivity journey.</h3>
    {/* Login Form */}
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Email Input */}
      <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'/>
      {/* Password Input */}
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
            text-muted-foreground
          "
        >
          {showPassword
            ? <EyeOff size={18}/>
            : <Eye size={18}/>
          }
        </button>
      
      </div>
      <button type='submit' className='w-full bg-zinc-800 text-foregound py-3 rounded-xl hover:bg-black transition-al duration-300 ease-in-out' >Login</button>
    </form>
    <p className='text-center mt-6 text-muted-foreground'>
      Don't have an account?{" "}
<Link to='/signup' className='font-medium text-foreground hover:underline fade-in'>
      Signup
</Link>
    </p>
<GoogleLogin onSuccess={handleGoogleLogin}
onError={()=>{
  toast.error("Google Login Failed")
}}/>
    </div>
  </div>
  </>
  )
}

export default Login