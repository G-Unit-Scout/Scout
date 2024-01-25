import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import RegisterUser from './components/RegisterUser'
import AdminKanbanBoard from './components/AdminKanbanBoard'

function App() {

  return (
    <>

     <AdminLogin/>
     <StudentKanbanBoard/>
     <RegisterUser/>
    <AdminKanbanBoard cohortId={2} />

    </>
  )
}

export default App