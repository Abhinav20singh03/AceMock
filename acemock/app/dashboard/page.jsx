import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from "./_components/AddNewInterview.jsx"
import InterviewList from "./_components/InterviewList.jsx"
import "./page.css"
const dashboard = () => {
  return (
    <div className='dashboard'>
      <div>
      <h2 className='dashboard-heading'>Dashboard</h2>
       <h2 className='dashboard-subheading'>Create and Start your AI Mock Interview</h2>
       <AddNewInterview/>
      </div>
       <div>
        <InterviewList/>
       </div>
    </div>
  )
}

export default dashboard
