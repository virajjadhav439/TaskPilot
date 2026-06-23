import { completeTask, deleteTask, updateTask } from '@/services/taskApi'
import { CheckCircle2, Clock3, PenLine, Trash, Trash2 } from 'lucide-react'
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
    
    <div className='bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 mt-2'>

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
    <div className="flex justify-between items-start">
  <div className="flex items-center gap-3">

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
      className={`font-medium text-xl ${
        task.status === "completed"
          ? "line-through opacity-70"
          : ""
      }`}
    >
      {task.title}
    </h3>

  </div>

  <div className="flex items-center gap-3">

    {task.status !== "completed" && (
      <button
        onClick={() => setIsEditing(true)}
      >
        <PenLine size={18}/>
      </button>
    )}

    <button
      onClick={() =>
        handleDeleteTask(task._id)
      }
    >
      <Trash2 size={18}/>
    </button>

  </div>
</div>

      <div
  className={`
    flex items-center gap-2 mt-3 text-sm
    ${
      task.status === "completed"
        ? "text-green-600"
        : "text-yellow-600"
    }
  `}
>
  {task.status === "completed"
    ? (
      <>
        <CheckCircle2 size={16}/>
        <span>Completed</span>
      </>
    )
    : (
      <>
        <Clock3 size={16}/>
        <span>Pending</span>
      </>
    )}

      <span
className={`
  px-3 py-1 rounded-full text-xs font-medium
  
  ${
    task.priority === "high"
    ? "bg-red-100 text-red-600"
    : task.priority === "medium"
    ? "bg-yellow-100 text-yellow-600"
    : "bg-green-100 text-green-600"
  }
  `}
>
{task.priority}
</span>
  </div>

  <div className="flex gap-3 mt-4 flex-wrap">

  <span
    className="
      px-3 py-1
      rounded-full
      text-xs
      font-medium
      bg-gray-100
    "
  >
    {task.isRecurring
      ? "Recurring"
      : "One Time"}
  </span>

  {task.dueDate && (
    <span
      className="
        px-3 py-1
        rounded-full
        text-xs
        font-medium
        bg-blue-100
        text-blue-600
      "
    >
      {new Date(
        task.dueDate
      ).toLocaleDateString()}
    </span>
  )}

</div>
    </>
  )}

</div>
    </>
  )
}

export default TaskCard