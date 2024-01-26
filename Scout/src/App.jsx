import { useState, useEffect } from 'react'

import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import RegisterUser from './components/RegisterUser'
import AdminKanbanBoard from './components/AdminKanbanBoard'

//test

function App() {

  // if the user is verified in the backend then you can use this state for conditional rendering!!!!!!!!!!!!!!!!!!!!!
  const [verified, setVerified] = useState(false)

  return (
    <>

      <AdminLogin setVerified={setVerified} />
     <StudentKanbanBoard/>
     <AdminKanbanBoard cohortId={2} />
    </>
  )
}

export default App