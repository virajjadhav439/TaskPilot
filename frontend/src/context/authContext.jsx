import { createContext, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({children})=>{
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem("token") || null)
  const [isAuthenticated,setIsAuthenticated] = useState(!!localStorage.getItem("token"))

  const login  = (userData,jwtToken)=>{
    setUser(userData)
    setToken(jwtToken)
    setIsAuthenticated(true)
    localStorage.setItem("token",jwtToken)
  }

  const logout = () =>{
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("token")
  }
  
  return (
    <AuthContext.Provider value={{user,token,isAuthenticated,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider