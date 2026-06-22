import React, { useState } from 'react'
import { createTask } from '@/services/taskApi'
import toast from 'react-hot-toast'

const TaskForm = ({fetchTasks}) => {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [priority,setPriority] = useState("medium")

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {

            const response = await createTask({
                title,
                description,
                priority
            })

            console.log(response.data)

            toast.success("Task Created")

            setTitle("")
            setDescription("")
            setPriority("medium")

        } catch (error) {

            console.log(error)

            toast.error("Failed To Create Task")
        }
        await fetchTasks()
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />

                <select
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit">
                    Create Task
                </button>

            </form>

        </div>
    )
}

export default TaskForm