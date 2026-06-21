import useAuth from '@/hooks/useAuth'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {

    const  {isAuthenticated} = useAuth()

    if(!isAuthenticated){
   return <Navigate to="/login" />
}

  return children
}

export default ProtectedRoutes