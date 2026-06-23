import Navbar from '@/components/shared/Navbar'
import React from 'react'

const Profile = () => {
  return (<>
  <Navbar/>
    {/* profile page */}
  <div className='pt-28 px-6'>
    {/* profile Heading */}
    <h1 className='text-4xl font-bold'>
      Profile
    </h1>

    <p className='text-gray-500 mt-2'>
      Your TaskPilot Account Information
    </p>

    <div className='bg-white border rounded-2xl shadow-sm p-6 mt-8 max-w-3xl'>
      <h2 className='text-2xl font-semibold'>
        User Information
      </h2>
      <p className='mt-4'>
        Name:Viraj
      </p>

      <p>
        Email:
      </p>
      <p>
        Member Since:
      </p>
    </div>
    </div>
  </>
  )
}

export default Profile