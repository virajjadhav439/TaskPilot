import { Shapes } from 'lucide-react'
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const AnalyticsChart = ({analytics}) => {
  const data =  [
    {
      name:"Completed",
      value:analytics.completedTasks || 0 ,
    },
    {
      name:"Pending",
      value:analytics.pendingTasks || 0,
    },
  ]
  const COLORS = ['#22c55e','#f59e0b']
  return (<>
    <div className='bg-white border rounded-2xl shadow-sm p-6 mt-8'>
    <h2 className='text-2xl font-semibold mb-6'>
      Task Distribution
    </h2>
    <div className='h-80'>
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart>

          <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          label>
{
  data.map((entry,index)=>(
    <Cell
    key={index}
    fill={COLORS[index]}
    />
  ))
}
          </Pie>
          <Tooltip/>
          <Legend/>
        </PieChart>

      </ResponsiveContainer>
    </div>
    </div>
  </>
  )
}

export default AnalyticsChart