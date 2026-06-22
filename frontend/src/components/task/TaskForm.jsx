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
        <div>

            <form onSubmit={handleSubmit}>
                {/* title */}
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                 {/* description */}
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                {/* priority */}
                <select
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
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
/>
{/* IsRecurring Checkbox */}
<label>

  <input
    type="checkbox"
    checked={isRecurring}
    onChange={(e)=>{
        setIsRecurring(e.target.checked)

        if(!e.target.checked){
            setRecurringType(null)
        }else{
            setRecurringType("daily")
        }
    }}
/>

  Recurring Task

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
                {/* submit */}
                <button type="submit">
                    Create Task
                </button>

            </form>

        </div>
    )
}

export default TaskForm