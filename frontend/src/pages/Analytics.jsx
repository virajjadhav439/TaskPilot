import RecentTasks from '@/components/dashboard/RecentTasks'
import StatusCards from '@/components/dashboard/StatusCards'
import { getAnalytics, getTasks } from '@/services/taskApi'
import React, { useEffect, useState } from 'react'

const Analytics = () => {
  const [analytics,setAnalytics]=useState({})
  const [tasks,setTasks] = useState([])

  const fetchTasks = async ()=>{
  const response = await getTasks()
  setTasks(response.data.tasks)
}

  const fetchAnalytics = async ()=>{
    try {
      const response = await getAnalytics()
      setAnalytics(response.data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchAnalytics()
    fetchTasks()
  },[])

  return (
    <>
    
      <div>
  <h1>Analytics</h1>

<StatusCards analytics={analytics}/>

<RecentTasks tasks={tasks} />
</div>
    </>
  )
}

export default Analytics