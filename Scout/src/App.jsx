import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './Components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import JobPostingsPage from './components/JobPostingsPage'


function App() {
  const [count, setCount] = useState(0)
  const [jobPosting, setJobPosting] = useState(false);

  const changeJobPosting = (boolean) => {
    setJobPosting(boolean)
  }

  return (
    <>
    <NavBar changeJobPosting = {changeJobPosting} />
     {/* <button className='btn btn-primary'>It Worked!</button> */}
     {/* <AdminLogin/> */}
     {jobPosting ? <JobPostingsPage /> :
     <StudentKanbanBoard />
     }
    
    <Footer />
    </>
  )
}

export default App

