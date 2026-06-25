import React, { useRef, useState } from 'react'
import { createTask } from '@/services/taskApi'
import toast from 'react-hot-toast'
import { ChevronDownCircle } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
const TaskForm = ({fetchTasks}) => {
  // collapse and Expand
const [isOpen,setIsOpen] = useState(false);

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [priority,setPriority] = useState("medium")

const [dueDate,setDueDate] = useState("")

const [isRecurring,setIsRecurring] = useState(false)

const [recurringType,setRecurringType] = useState("daily")
const [isLoading,setIsLoading] = useState(false)
const [category, setCategory] = useState("Personal")


// Auto Focus on Title
const titleRef =  useRef(null)

    const handleSubmit = async (e)=>{
        e.preventDefault()
      setIsLoading(true)
        try {
            if(!title.trim()){

   toast.error("Title is required")

   return
}
            if(isRecurring && !dueDate){

    toast.error(
      "Recurring tasks require a due date"
    )

    return
}
if (
  dueDate &&
  new Date(dueDate) <
  new Date().setHours(0,0,0,0)
){
  toast.error(
    "Due date cannot be in the past"
  )
  return
}
// Create Task
await createTask({
    title,
    description,
    priority,
    dueDate,
    isRecurring,
    category,
    recurringType:
      isRecurring
        ? recurringType
        : null,
})

            

            toast.success("Task Created")
            setTitle("")
            setDescription("")
            setPriority("medium")
            setDueDate("")
            setIsRecurring(false)
            setRecurringType("daily")
            setIsLoading(false)
            setCategory("Personal")
            titleRef.current?.focus()

await fetchTasks()
        } catch (error) {
            toast.error("Failed To Create Task")
        }
        
    }

    return (
        <div className='bg-white rounded-2xl border shadow-sm p-6 mt-6'>
          <div className="mb-4">
  <div
  className="
    flex
    justify-between
    items-center
    cursor-pointer
  "
  onClick={() =>
    setIsOpen(!isOpen)
  }
>

  <h1 className="text-2xl font-bold">
    Create New Task
  </h1>

  <ChevronDownCircle
  className={`
    transition-transform
    duration-400
    ${
      isOpen
        ? "rotate-180"
        : ""
    }
  `}
/>

</div>

</div>
<AnimatePresence>

  {isOpen && (

    <motion.div
      initial={{
        opacity: 0,
        height: 0
      }}
      animate={{
        opacity: 1,
        height: "auto"
      }}
      exit={{
        opacity: 0,
        height: 0
      }}
      transition={{
        duration: 0.3
      }}
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
                {/* title */}
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
                    ref={titleRef}
                />
                 {/* description */}
                <textarea
                rows={4}
                    placeholder="Task Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
                />
                <div className="flex flex-wrap gap-4 items-center">
                {/* priority */}

                <select
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
                    className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
                    >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                {/* DueDate */}
                <input
  type="date"
  value={dueDate}
  onChange={(e)=>setDueDate(e.target.value)}
  className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
/>
{/* IsRecurring Checkbox */}
<label className='flex items-center gap-2'>

  <input
    type="checkbox"
    checked={isRecurring}
    onChange={(e)=>{
  setIsRecurring(e.target.checked)
  className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
}
    }
/>

  Recurring Task

</label>
{isRecurring && (
  
  <select
  value={recurringType}
  onChange={(e)=>
    setRecurringType(e.target.value)
  }
  className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
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
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="
    border
    rounded-xl
    px-3
    py-2
  "
>
  <option>Personal</option>
  <option>Work</option>
  <option>Study</option>
  <option>Health</option>
  <option>Finance</option>
  <option>Other</option>
</select>
</div>
                {/* submit */}
                <button
  type="submit"
  disabled={isLoading}
  className="
    bg-zinc-800
    text-white
    px-5
    py-3
    rounded-xl
    hover:bg-black
    transition-all
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {isLoading ? "Creating..." : "Create Task"}
</button>

            </form>
    </motion.div>

  )}

</AnimatePresence>
            

        </div>
    )
}

export default TaskForm