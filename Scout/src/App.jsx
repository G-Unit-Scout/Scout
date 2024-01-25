import { useState, useEffect } from 'react'

import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import AdminKanbanBoard from './components/AdminKanbanBoard'

//test

function App() {

  const [verified, setVerified] = useState(false)

  return (
    <>

      <AdminLogin setVerified={setVerified} />
     {/* <StudentKanbanBoard/> */}
     {/* <AdminKanbanBoard cohortId={2} /> */}
    </>
  )
}

export default App