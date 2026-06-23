import React, { useState } from 'react'
import { createTask } from '@/services/taskApi'
import toast from 'react-hot-toast'

const TaskForm = ({fetchTasks}) => {

    const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [priority,setPriority] = useState("medium")

const [dueDate,setDueDate] = useState("")

const [isRecurring,setIsRecurring] = useState(false)

const [recurringType,setRecurringType] = useState("daily")

    const handleSubmit = async (e)=>{
        e.preventDefault()

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

            const response = await createTask({
    title,
    description,
    priority,
    dueDate,
    isRecurring,
    recurringType:
      isRecurring
        ? recurringType
        : null,
})

            console.log(response.data)

            toast.success("Task Created")

            setTitle("")
setDescription("")
setPriority("medium")
setDueDate("")
setIsRecurring(false)
setRecurringType("daily")

await fetchTasks()
        } catch (error) {

            console.log(error)

            toast.error("Failed To Create Task")
        }
        
    }

    return (
        <div className='bg-white rounded-2xl border shadow-sm p-6 mt-6'>
          <div className="mb-8">
  <h1 className="text-2xl font-bold">
    Create New Task
  </h1>
</div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* title */}
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className='w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-300'
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
</div>
                {/* submit */}
                <button type="submit"
                className='bg-zinc-800 text-white px-5 py-3 rounded-xl hover:bg-black transition-all font-medium'>
                    Create Task
                </button>

            </form>

        </div>
    )
}

export default TaskForm