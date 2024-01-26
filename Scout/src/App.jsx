import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import JobPostingsPage from './components/JobPostingsPage'
import RegisterUser from './components/RegisterUser'
import AdminKanbanBoard from './components/AdminKanbanBoard'


function App() {
  const [count, setCount] = useState(0)
  const [jobPosting, setJobPosting] = useState(false);
  // if the user is verified in the backend then you can use this state for conditional rendering!!!!!!!!!!!!!!!!!!!!!
  const [verified, setVerified] = useState(false)

  const changeJobPosting = (boolean) => {
    setJobPosting(boolean)
  }

  return (
    <>
<<<<<<< HEAD

      <AdminLogin setVerified={setVerified} />
     <StudentKanbanBoard/>
     <AdminKanbanBoard cohortId={2} />
=======
    <NavBar changeJobPosting = {changeJobPosting} />
     {/* <button className='btn btn-primary'>It Worked!</button> */}
     {jobPosting ? <JobPostingsPage /> :
     <StudentKanbanBoard />
     
     }
    <AdminLogin setVerified={setVerified} />
     <RegisterUser/>
    <Footer />
>>>>>>> 6b306e8941e23bf03ed71b1f0f7591fd1e01069d
    </>
  )
}

export default App
