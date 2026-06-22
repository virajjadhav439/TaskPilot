import React from 'react'

const StatusCards = ({analytics}) => {

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

  return (
  <>
  <div>
    {cards.map((card) => (
      <div key={card.title}>
        <h3>{card.title}</h3>
        <p>{card.value}</p>
      </div>
    ))}
  </div>

  </>
  )
}

export default StatusCards