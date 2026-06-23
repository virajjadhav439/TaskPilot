import { completeTask, deleteTask, updateTask } from '@/services/taskApi'
import { CheckCircle2, Clock3, Eye, PenLine, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger,Dialog } from '../ui/dialog'

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


    toast.success("Task Updated")

    setIsEditing(false)

    fetchTasks()

  } catch (error) {

    toast.error("Task Updation Failed")

  }
}

  const handleDeleteTask= async (id)=>{
    try {
      
      await deleteTask(id)
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

{/* edit page */}
  {isEditing ? (
    <>
  <div className="space-y-4">

    <input
      type="text"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      placeholder="Task Title"
      className="
        w-full
        border
        rounded-xl
        p-3
        focus:outline-none
        focus:ring-2
        focus:ring-zinc-300
      "
    />

    <textarea
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      placeholder="Task Description"
      rows={3}
      className="
        w-full
        border
        rounded-xl
        p-3
        resize-none
        focus:outline-none
        focus:ring-2
        focus:ring-zinc-300
      "
    />

    <div className="flex flex-wrap gap-4 items-center">

      <select
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
        className="
          border
          rounded-xl
          px-3
          py-2
        "
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e)=>setDueDate(e.target.value)}
        className="
          border
          rounded-xl
          px-3
          py-2
        "
      />

      <label className="flex items-center gap-2">
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
          className="
            border
            rounded-xl
            px-3
            py-2
          "
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      )}

    </div>

    <div className="flex gap-3">

      <button
        className="
          bg-zinc-800
          text-white
          px-5
          py-2
          rounded-xl
          hover:bg-black
          transition-all
        "
        onClick={() =>
          handleUpdateTask(task._id,{
            title,
            description,
            priority,
            dueDate,
            isRecurring,
            recurringType: isRecurring
              ? recurringType
              : null
          })
        }
      >
        Save
      </button>

      <button
        className="
          border
          px-5
          py-2
          rounded-xl
          hover:bg-gray-100
          transition-all
        "
        onClick={()=>{
          setTitle(task.title)
          setDescription(task.description)
          setPriority(task.priority)
          setDueDate(
            task.dueDate
              ? task.dueDate.split("T")[0]
              : ""
          )
          setIsRecurring(task.isRecurring)
          setRecurringType(
            task.recurringType || "daily"
          )
          setIsEditing(false)
        }}
      >
        Cancel
      </button>

    </div>

  </div>
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
      <Trash2 size={18} className='text-red-600'/>
    </button>

      <Dialog>
  <DialogTrigger asChild>

    <button>
  <Eye size={18}/>
</button>

  </DialogTrigger>

  <DialogContent>

  <DialogHeader>

    <DialogTitle>
      {task.title}
    </DialogTitle>

  </DialogHeader>

  <div className="space-y-4">

    <p>
      {task.description}
    </p>

    <p>
      Status: {task.status}
    </p>

    <p>
      Priority: {task.priority}
    </p>

    <p>
      Recurring:
      {task.isRecurring ? "Yes" : "No"}
    </p>

    {task.dueDate && (
      <p>
        Due:
        {new Date(task.dueDate)
          .toLocaleDateString()}
      </p>
    )}

  </div>

</DialogContent>

</Dialog>

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
      ? "Repeating"
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