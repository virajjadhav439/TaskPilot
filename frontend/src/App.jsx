import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Calendar from './pages/Calendar'

function App() {
  return (
    <>
        <Toaster position='top-center' />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>} />
        <Route path='/analytics' element={
          <ProtectedRoutes>
            <Analytics/>
          </ProtectedRoutes>
          } />
        <Route path='/profile' element={
          <ProtectedRoutes>
            <Profile/>
          </ProtectedRoutes>
          } />
        <Route path='/calendar' element={
          <ProtectedRoutes>
            <Calendar/>
          </ProtectedRoutes>
          } />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
