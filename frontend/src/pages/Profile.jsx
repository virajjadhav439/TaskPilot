import StatusCards from '@/components/dashboard/StatusCards'
import Navbar from '@/components/shared/Navbar'
import { getAnalytics } from '@/services/taskApi'
import React, { useEffect, useState } from 'react'

const Profile = () => {

  const [user,setUser] = useState(null)
  const [analytics,setAnalytics]=useState({})
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
      const storedUser = localStorage.getItem("user")
      setUser(JSON.parse(storedUser))
    },[])

    const fetchAnalytics = async ()=>{
        try {
          const response = await getAnalytics()
          setAnalytics(response.data)
        } catch (error) {
        toast.error("Getting Analytics failed")
        }finally{
          setLoading(false)
        }
      }


      useEffect(()=>{
        fetchAnalytics()
      },[])

  return (<>
  <Navbar/>
    {/* profile page */}
  <div className='pt-28 px-6'>
    {/* profile Heading */}
    <h1 className='text-4xl font-bold'>
      Profile
    </h1>

    <p className='text-gray-500 mt-2'>
      Your TaskPilot Account Information
    </p>

    <div className='bg-card border rounded-2xl shadow-sm p-6 mt-8 max-w-3xl flex grid-cols-2 gap-5 '>
      <h2 className='text-2xl font-semibold m-2'>
        User Information
      <div className="h-30 w-30 rounded-full bg-zinc-800 text-white flex items-center justify-center text-7xl font-bold mt-2 ">
  {user?.name.charAt(0).toUpperCase()}
  </div>
      </h2>
<div className='mt-10 text-2xl font-medium'>

      <div className='mt-5 rounded-xl px-2 mb-2'>
        <p className="text-sm text-gray-500">Name:</p>
        <p className="font-medium">{user?.name}</p>
      </div>

      <div className='rounded-xl px-2 mb-2'>
        <p className="text-sm text-gray-500">Email:</p>
        <p className="font-medium">{user?.email}</p>
      </div>

      <div className='rounded-xl px-2 mb-2'>
        
        <p className="text-sm text-gray-500">Member Since:</p>
        <p className="font-medium"></p>
      </div>
</div>
    </div>
    <h2 className='text-2xl font-semibold mt-8 mb-4'>
  Statistics
</h2>

<div>
<StatusCards analytics={analytics} loading={loading}/>
</div>
    </div>
  </>
  )
}

export default Profile  