import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import Dashboard from '@/assets/Dashboard.png'
import {CalendarDays,Repeat,ChartPie,FolderKanban} from "lucide-react";
import {motion} from "motion/react"
const Home = () => {
  const features = [
  {
    title: "Calendar View",
    description: "View all your scheduled tasks in an intuitive calendar.",
    icon:<CalendarDays size={26}/>
  },
  {
    title: "Recurring Tasks",
    description: "Create daily, weekly and monthly recurring reminders.",
    icon:<Repeat size={26}/>
  },
  {
    title: "Analytics",
    description: "Track productivity with charts and completion statistics.",
    icon:<ChartPie size={26}/>
  },
  {
    title: "Categories",
    description: "Organize your work using custom task categories.",
    icon:<FolderKanban size={26}/>
  }
];
  return (
    <>
    <Navbar/>
    {/* Landing Page */}
    <div className='pt-28 px-10'>
      <div>

      {/* hero Section */}
      {/* Hero Section */}
<motion.section className="max-w-6xl mx-auto mt-20"
initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}>

  <div className="max-w-3xl">

    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-tight">
      Schedule
    </h1>

    <div className="text-5xl md:text-7xl font-extrabold text-foreground h-20 md:h-24">
      <Typewriter
        options={{
          strings: [
            "Smarter",
            "Work",
            "Passion",
            "Creation",
            "Consistency",
          ],
          autoStart: true,
          loop: true,
          delay: 65,
          deleteSpeed: 40,
        }}
      />
    </div>

    <p className="mt-8 text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl">
      Organize your work, manage recurring tasks, visualize your
      schedule, and stay productive every single day.
    </p>

    <div className="flex flex-wrap gap-4 mt-10">

      <Link to="/signup">
        <button className="bg-zinc-900 text-white px-8 py-4 rounded-xl hover:bg-black transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer">
          Get Started
        </button>
      </Link>

      <Link
        to="https://github.com/virajjadhav439/TaskPilot"
        target="_blank"
      >
        <button className="border border-zinc-300 px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all duration-300 cursor-pointer">
          View GitHub
        </button>
      </Link>

    </div>

  </div>

</motion.section>
      </div>
      <h2 className="text-4xl font-bold text-center mt-15">
Beautiful Dashboard
</h2>

<p className="text-zinc-600 text-center mt-3 mb-5">
Manage your tasks from one clean workspace.
</p>
      {/* Dashboard */}
      <div className="rounded-3xl overflow-hidden border border-border shadow-2xl bg-card p-3">
    <img
        src={Dashboard}
        alt="TaskPilot Dashboard"
        className="rounded-2xl w-full"
    />
</div>
      {/* Features */}
<motion.section className="max-w-6xl mx-auto mt-32"
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:0.6}}>

  <h2 className="text-4xl font-bold text-center">
    Features
  </h2>

  <p className="text-center text-zinc-600 mt-4 mb-12">
    Everything you need to stay productive.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    {features.map((feature) => (

      <div
        key={feature.title}
        className="border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      >

        <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-5">
{feature.icon}
</div>

        <h3 className="text-xl font-semibold">
          {feature.title}
        </h3>

        <p className="text-zinc-600 mt-3 leading-relaxed">
          {feature.description}
        </p>

      </div>

    ))}

  </div>

</motion.section>

      {/* Call to Action Button */}
      {/* Call To Action */}
<motion.section className="max-w-6xl mx-auto mt-32"
initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}>

  <div className="rounded-3xl bg-zinc-900 text-white px-10 py-20 text-center">

    <h2 className="text-4xl md:text-5xl font-bold">
      Ready to Stay Productive?
    </h2>

    <p className="mt-6 text-zinc-300 max-w-2xl mx-auto text-lg">
      Join TaskPilot today and organize your work with recurring tasks,
      analytics, categories and calendar scheduling.
    </p>

    <Link to="/signup">
      <button className="mt-10 bg-card text-foreground px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-500 cursor-pointer">
        Get Started
      </button>
    </Link>

  </div>

</motion.section>
      
      {/* Footer */}

<footer className="max-w-6xl mx-auto mt-24 pb-10 border-t pt-8">

  <div className="flex flex-col md:flex-row items-center justify-between gap-6">

    <div>

      <h2 className="text-2xl font-bold">
        TaskPilot
      </h2>

      <p className="text-zinc-500 mt-2">
        Build consistency. Stay productive.
      </p>

    </div>

    <div className="flex gap-6 text-zinc-600">

      <Link to="/" className='text-zinc-700 hover:text-foreground hover:underline'>
        Home
      </Link>

      <Link to="/signup" className='text-zinc-700 hover:text-foreground hover:underline'>
        Get Started
      </Link>

      <a
        href="https://github.com/virajjadhav439/TaskPilot"
        target="_blank"
        rel="noopener noreferrer" className='text-zinc-700 hover:text-foreground hover:underline'
      >
        GitHub
      </a>

    </div>

  </div>

  <p className="text-center text-zinc-500 mt-10 text-sm">
    © 2026 TaskPilot. Built with React, Express, MongoDB and Tailwind CSS.
  </p>

</footer>
    </div>
    </>
  )
}

export default Home