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
  const [user_id, setUser_id] = useState(5);
  const [usersCohortId, setUsersCohortId] = useState(1);

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
     <div className='flex justify-center'>
        <button className="btn btn-primary" onClick={toggleOption}>
            Toggle userType
        </button>
        <p>Current Data: userType: {userType} & user_id: {user_id} & cohort_id: {usersCohortId}</p>
        
    </div>
     {jobPosting ? <JobPostingsPage userType={userType}/> :
     <KanbanBoard userType={userType} user_id={user_id} usersCohortId={usersCohortId}/>
     
     }
    {/* <AdminLogin setVerified={setVerified} />
    <RegisterUser/> */}
    <Footer />
    </>
  )
}

export default App