import AnalyticsChart from '@/components/dashboard/AnalyticsChart'
import RecentTasks from '@/components/dashboard/RecentTasks'
import StatusCards from '@/components/dashboard/StatusCards'
import Navbar from '@/components/shared/Navbar'
import { getAnalytics, getTasks } from '@/services/taskApi'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Analytics = () => {
  const [analytics,setAnalytics]=useState({})
  const [tasks,setTasks] = useState([])
  const [loading,setLoading] = useState(true)
  
  const fetchTasks = async ()=>{
  const response = await getTasks()
  setTasks(response.data.tasks)
}

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
    fetchTasks()
  },[])

  return (
    <>
    {/* navbar */}
    <div>
      <Navbar/>
    </div>
    {/* analytics page */}
      <div className='min-h-screen p-6 pt-28 px-6'>
        {/* analytics Container */}
        <div className='mb-8'>
          {/* Analytics heading */}
      <h1 className='text-4xl font-bold'>Analytics</h1>

      <p className='text-gray-500 mt-2'>Monitor your productivity and task progress</p>

        </div>

<div>
<StatusCards analytics={analytics} loading={loading}/>
</div>

<div>
  <AnalyticsChart analytics={analytics}/>
</div>

{/* recent Tasks Container */}
<div className='mt-8'>
<RecentTasks tasks={tasks} />
</div>

</div>
    </>
  )
}

export default Analytics