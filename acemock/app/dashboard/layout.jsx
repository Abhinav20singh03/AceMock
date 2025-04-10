import React from 'react'
import Header from "./_components/Header"
import "./layout.css"
const layout = ({children}) => {
  return (
    <div>
      <Header/>
      <div className='dashboard-container'>
      {children}
      </div>
    </div>
  )
}

export default layout
