import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './components/KanbanBoard'
import AdminLogin from './components/AdminLogin'

function App() {

  const [userType, setUserType] = useState('student');


  const toggleOption = () => {
    setUserType(prevType => prevType === 'student' ? 'admin' : 'student');
  };




  return (
    <>
    <div>
        <button className="btn btn-primary" onClick={toggleOption}>
            Toggle userType
        </button>
        <p>Current userType: {userType}</p>
    </div>

     {/* <AdminLogin/> */}
     <StudentKanbanBoard userType={userType}/>
    </>
  )
}

export default App
