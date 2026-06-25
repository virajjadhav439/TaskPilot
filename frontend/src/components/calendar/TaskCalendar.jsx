import { getTasks } from '@/services/taskApi'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import TaskListForDay from './TaskListForDay'
import toast from 'react-hot-toast'

import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const TaskCalendar = () => {
  const [date,setDate] = useState(new Date())
  const [tasks,setTasks] = useState([])
  
  
  const fetchTasks = async ()=>{
    try {
      
      const response = await getTasks()
      setTasks(response.data.tasks)
      
    } catch (error) {
      toast.error("Error Fetching Tasks")
    }
  }
  
  const selectedTasks = tasks.filter((task) => {
  if (!task.dueDate) return false;

  return (
    new Date(task.dueDate).toDateString() === date.toDateString()
  );
});


  useEffect(()=>{
    fetchTasks()
  },[])

  return (<>
    <div className="bg-white rounded-2xl border shadow-sm p-6 mt-5 flex justify-center">
      <Calendar 
      value={date}
      onChange={setDate}
      tileContent={({date,view})=>{
        if (view!="month") {
          return null
        }
        const hasTask = tasks.some(
          task=>task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString()
        )

        return hasTask? (
          <div className='flex justify-center m-1'>
            <div className='w-2 h-2 rounded-full bg-blue-500'></div>
          </div>
        ):null
      }}/>

    </div>
    <div className='m-4'>
      
    <h1 className="text-3xl font-bold">Tasks</h1>
    </div>
    <div>
      
          <TaskListForDay tasks={selectedTasks} fetchtasks={fetchTasks} date={date} />
        
    </div>
      </>
  )
}

export default TaskCalendar