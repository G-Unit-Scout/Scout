import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import RegisterUser from './components/RegisterUser'

function App() {

  return (
    <>

<<<<<<< HEAD
     <AdminLogin/>
     <StudentKanbanBoard/>
     <AdminKanbanBoard cohortId={2} />
=======
     {/* <AdminLogin/> */}
     {/* {/* <StudentKanbanBoard/> */}
     <RegisterUser/>
     {/* <AdminKanbanBoard cohortId={2} /> */}
>>>>>>> 9954514de5ef12984698b5febed59175c6209504
    </>
  )
}

export default App