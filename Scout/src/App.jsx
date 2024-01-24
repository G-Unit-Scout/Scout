import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import RegisterUser from './components/RegisterUser'

function App() {

  return (
    <>

     {/* <AdminLogin/> */}
     {/* <StudentKanbanBoard/> */}
     <RegisterUser/>
    </>
  )
}

export default App
