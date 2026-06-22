import React from 'react'

const RecentTasks = ({tasks}) => {
  return (
    <>
    <div>
      <h2>Recent Tasks</h2>
      
      {tasks.slice(0,5).map((task)=>(
        <div key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default RecentTasks