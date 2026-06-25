import TaskCalendar from '@/components/calendar/TaskCalendar'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const Calendar = () => {
  return (
    <>
    <Navbar/>
    <div className='pt-28 px-6'>
    <h1 className='text-4xl font-bold'>Calendar</h1>
    <p className='text-gray-500 mt-2'>View your Scheduled Tasks.</p>
    <TaskCalendar/>
    </div>
    </>
  )
}

export default Calendar