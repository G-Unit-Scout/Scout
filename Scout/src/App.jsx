import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'

function App() {

  return (
    <>

     {/* <AdminLogin/> */}
     <StudentKanbanBoard/>
    </>
  )
}

export default App
