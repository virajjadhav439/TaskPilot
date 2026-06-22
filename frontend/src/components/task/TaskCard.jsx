import { deleteTask, updateTask } from '@/services/taskApi'
import { PenLine, Trash } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const TaskCard = ({task,fetchTasks}) => {
  const [isEditing,setIsEditing] = useState(false)
  const [title,setTitle] = useState(task.title)
  const [priority,setPriority] = useState(task.priority)

  const handleUpdateTask = async (id,data)=>{
  try {
    const response = await updateTask(id,data)

    console.log(response.data)

    toast.success("Task Updated")

    setIsEditing(false)

    fetchTasks()

  } catch (error) {

    toast.error("Task Updation Failed")

  }
}

  const handleDeleteTask= async (id)=>{
    try {
      console.log(id);
      const response = await deleteTask(id)
      console.log(response.data);
      toast.success("Task Deleted")
      fetchTasks()
    } catch (error) {
      toast.error("Task Deletion Failed")
    }
  }
  
  return (
    <>
    <div>

  {isEditing ? (
    <>
      <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        onClick={() =>
          handleUpdateTask(task._id,{
            title,
            priority
          })
        }
      >
        Save
      </button>

      <button
        onClick={()=>{
          setTitle(task.title)
          setPriority(task.priority)
          setIsEditing(false)
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <h3>{task.title}</h3>

      <p>{task.status}</p>

      <p>{task.priority}</p>

      <button
        onClick={() => setIsEditing(true)}
      >
        <PenLine/>
      </button>

      <button
        onClick={() =>
          handleDeleteTask(task._id)
        }
      >
        <Trash />
      </button>
    </>
  )}

</div>
    </>
  )
}

export default TaskCard