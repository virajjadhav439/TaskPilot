import Navbar from '@/components/shared/Navbar'
import TaskCard from '@/components/task/TaskCard'
import TaskForm from '@/components/task/TaskForm'
import { getTasks } from '@/services/taskApi'
import React, { useEffect, useState } from 'react'

const Dashboard = () => { 
  const [tasks,setTasks] = useState([])

  const fetchTasks = async ()=>{
        try {
            const response = await getTasks()
            setTasks(response.data.tasks)

        } catch (error) {

            console.log(error)

        }
    }

// load after Reload
  useEffect(()=>{
    fetchTasks()
},[])
  return (<>
    <Navbar/>
    <div>
      <h1>TaskPilot Dashboard</h1>
      <p>Welcome Back</p>

      {tasks.map(task => (
   <TaskCard
      key={task._id}
      task={task}
      fetchTasks={fetchTasks}
   />
))}
    </div>
    <TaskForm fetchTasks={fetchTasks}/>
  </>
  )
}

export default Dashboard