
import useAuth from '@/hooks/useAuth'
import { loginUser } from '@/services/authApi'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState('')
  
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
  return (<>
  {/* login page */}
  <div>
    {/* login container */}
    <div>
      {/* login heading */}
      <h1>Login</h1>
      {/* login subheading */}
      <h3>Login to be Consistent</h3>
    {/* Login Form */}
    <form onSubmit={handleSubmit}>
      {/* Email Input */}
      <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
      {/* Password Input */}
      <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
      <button type='submit' >Login</button>
    </form>
    <h3>Don't have a account? 
<Link to='/signup'>
      Signup
</Link>
    </h3>
    </div>
  </div>
  </>
  )
}

export default Login