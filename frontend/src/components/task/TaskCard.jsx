import { completeTask, deleteTask, updateTask } from '@/services/taskApi'
import { PenLine, Trash } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const TaskCard = ({task,fetchTasks}) => {
  const [isEditing,setIsEditing] = useState(false)
  const [title,setTitle] = useState(task.title)
  const [priority,setPriority] = useState(task.priority)
  const [description,setDescription] =useState(task.description)
  const [dueDate,setDueDate] =useState(task.dueDate ? task.dueDate.split("T")[0]: "")
  const [isRecurring,setIsRecurring] = useState(task.isRecurring)
  const [recurringType,setRecurringType] = useState(task.recurringType || "daily")

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
      
      const response = await deleteTask(id)
      console.log(response.data);
      toast.success("Task Deleted")
      fetchTasks()
    } catch (error) {
      toast.error("Task Deletion Failed")
    }
  }
  
  const handleCompleteTask = async (id)=>{
    try {
      const response =
   await completeTask(id)

toast.success(
   response.data.message
)
      fetchTasks()
    } catch (error) {
      
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

      <textarea
  value={description}
  onChange={(e)=>
    setDescription(e.target.value)
  }
/>

<input
  type="date"
  value={dueDate}
  onChange={(e)=>
    setDueDate(e.target.value)
  }
/>

<label>

  <input
    type="checkbox"
    checked={isRecurring}
    onChange={(e)=>
      setIsRecurring(e.target.checked)
    }
  />

  Recurring

</label>
{isRecurring && (
  <select
    value={recurringType}
    onChange={(e)=>
      setRecurringType(e.target.value)
    }
  >
    <option value="daily">
      Daily
    </option>

    <option value="weekly">
      Weekly
    </option>

    <option value="monthly">
      Monthly
    </option>

  </select>
)}

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
          handleUpdateTask(
  task._id,
  {
    title,
    description,
    priority,
    dueDate,
    isRecurring,
    recurringType:
      isRecurring
        ? recurringType
        : null
  }
)
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
    <input
  type="checkbox"
  checked={task.status === "completed"}
  disabled={
    task.isRecurring &&
    task.status === "completed"
  }
  onChange={() =>
    handleCompleteTask(task._id)
  }
/>

      <h3
  style={{
    textDecoration:
      task.status === "completed"
        ? "line-through"
        : "none"
  }}
>
  {task.title}
</h3>

      <p>{task.status}</p>

      <p>{task.priority}</p>
  <p>
  Recurring:
  {task.isRecurring ? "Yes" : "No"}
</p>
      {task.status !== "completed" && (
  <button
    onClick={() => setIsEditing(true)}
  >
    <PenLine />
  </button>
)}

      <button
        onClick={() =>
          handleDeleteTask(task._id)
        }
      >
        <Trash />
      </button>
      <p>{task.dueDate}</p>
    </>
  )}

</div>
    </>
  )
}

export default TaskCard