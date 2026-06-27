import React from 'react'

const StatusCards = ({analytics,loading}) => {
  
  const cards = [
  {
    title: "Total Tasks",
    value: analytics.totalTasks,
  },
  {
    title: "Completed Tasks",
    value: analytics.completedTasks,
  },
  {
    title: "Pending Tasks",
    value: analytics.pendingTasks,
  },
  {
    title: "High Priority Tasks",
    value: analytics.highPriorityTasks,
  },
  {
    title: "Completion Rate",
    value: analytics.completionRate,
  },
]

if (loading) {
  return (
    <>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
    {cards.map((card) => (
      <div key={card.title} className='rounded-2xl border p-5 shadow-sm bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      </div>
    ))}
  </div>
  </>
  )
}
  return (
  <>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
    {cards.map((card) => (
      <div key={card.title} className='rounded-2xl border p-5 shadow-sm bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
        <p className='text-4xl font-bold mt-2'>{card.value}</p>
        <h3 className='text-sm text-gray-500'>{card.title}</h3>
      </div>
    ))}
  </div>
  </>
  )
}

export default StatusCards