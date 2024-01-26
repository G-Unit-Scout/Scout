import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import AdminLogin from './components/AdminLogin'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import JobPostingsPage from './components/JobPostingsPage'
import RegisterUser from './components/RegisterUser'
import KanbanBoard from './components/KanbanBoard'


function App() {
  const [count, setCount] = useState(0)
  const [jobPosting, setJobPosting] = useState(false);
  // if the user is verified in the backend then you can use this state for conditional rendering!!!!!!!!!!!!!!!!!!!!!
  const [verified, setVerified] = useState(false)
  const [userType, setUserType] = useState('student');

  const changeJobPosting = (boolean) => {
    setJobPosting(boolean)
  }

  const toggleOption = () => {
    setUserType(prevType => prevType === 'student' ? 'admin' : 'student');
  };

  return (
    <>
    <NavBar changeJobPosting = {changeJobPosting} />
     {/* <button className='btn btn-primary'>It Worked!</button> */}
     <div>
        <button className="btn btn-primary" onClick={toggleOption}>
            Toggle userType
        </button>
        <p>Current userType: {userType}</p>
    </div>
     {jobPosting ? <JobPostingsPage /> :
     <KanbanBoard userType={userType}/>
     
     }
    {/* <AdminLogin setVerified={setVerified} />
    <RegisterUser/> */}
    <Footer />
    </>
  )
}

export default App