import { CheckCircle, CheckCircle2, Clock3 } from 'lucide-react'
import React from 'react'

const RecentTasks = ({tasks}) => {
  return (
    <>
    <div className='mt-8 max-w-3xl'>
      <h2 className='text-2xl font-semibold mb-4'>Recent Tasks</h2>
      
      <div className='space-y-4'>
      {tasks.slice(0,5).map((task)=>(
        <div key={task._id} className='bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300'>
          <h4
  className={
    task.status === "completed"
      ? "font-semibold text-lg line-through opacity-70"
      : "font-semibold text-lg"
  }
>
  {task.title}
</h4>
           <div className={`flex items-center gap-2 mt-3 text-sm ${task.status === "completed"? "text-green-600": "text-yellow-600"}`}>
            {task.status === "completed"
  ? <>
  <div className="flex items-center gap-2 mt-3">
  <CheckCircle2 size={16}/>
  <span>Completed</span>
</div>
  </>
  : <>
  <div className="flex items-center gap-2 mt-3">
  <Clock3 size={16}/>
  <span>Pending</span>
</div>
  </>}
            </div>
        </div>
      ))}
      </div>
    </div>
    </>
  )
}

export default RecentTasks