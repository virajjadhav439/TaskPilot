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
    <div className="pt-28 px-6">
      <div className="mb-8">
  <h1 className="text-4xl font-bold">
    Dashboard
  </h1>

  <p className="text-gray-500 mt-2">
    Welcome back, manage your tasks efficiently.
  </p>
</div>

      <TaskForm fetchTasks={fetchTasks}/>

      <div className="m-4">
  <h1 className="text-3xl font-bold">
    Tasks
  </h1>
  
</div>
      {tasks.map(task => (
   <TaskCard
      key={task._id}
      task={task}
      fetchTasks={fetchTasks}
   />
))}
    </div>
  </>
  )
}

export default Dashboard