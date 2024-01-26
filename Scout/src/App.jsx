import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './Components/StudentKanbanBoard'
import AdminLogin from './components/AdminLogin'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import JobPostingsPage from './components/JobPostingsPage'
import RegisterUser from './components/RegisterUser'


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
    <NavBar changeJobPosting = {changeJobPosting} />
     {/* <button className='btn btn-primary'>It Worked!</button> */}
     <AdminLogin setVerified={setVerified} />
     <RegisterUser/>
     {jobPosting ? <JobPostingsPage /> :
     <StudentKanbanBoard />
     }
    
    <Footer />
    </>
  )
}

export default App
