import { signupUser } from '@/services/authApi'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
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
    <div>
      {/* signup Container */}
      <div>
        {/* SignUp Heading */}
        <h1>Signup</h1>
        {/* Signup SubHeading */}
        <h3>Increase your Productivity with Us!</h3>
        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
          <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
          <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
          <button type='submit'>Signup</button>
        </form>
        <h3>Already have a account?
<Link to='/login'>
      Login
</Link>
    </h3>
      </div>
    </div>
    </>
  )
}

export default Signup