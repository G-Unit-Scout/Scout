import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import AdminKanbanBoard from './components/AdminKanbanBoard'

function App() {

  return (
    <>

     {/* <AdminLogin/> */}
     {/* <StudentKanbanBoard/> */}
     <AdminKanbanBoard cohortId={2} />
    </>
  )
}

export default App
