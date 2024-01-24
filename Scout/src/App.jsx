<<<<<<< HEAD
=======
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
>>>>>>> 38fd85be96487852f224a95fa42760347f6beb78
