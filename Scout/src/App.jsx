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
		setJobPosting(boolean);
	};

	// you can use this for a useEffect to fetch the user data from the backend
	const fetchUser = async (id) => {
    setUserId(id);
    console.log(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setVerified(false);
    setUserId(0);
  }

  const toggleOption = () => {
    setUserType(prevType => prevType === 'student' ? 'admin' : 'student');
  };


	return (
		<div className="font-galvanize">
			{/* {!verified ? ( */}
				<AdminLogin setVerified={setVerified} fetchUser={fetchUser} />
			{/* ) : ( */}
				<>
					<NavBar changeJobPosting={changeJobPosting} handleLogout={handleLogout} />
					{jobPosting ? <JobPostingsPage userType={userType} user_id={user_id} usersCohortId={usersCohortId}/> :
          <KanbanBoard userType={userType} user_id={user_id} usersCohortId={usersCohortId}/>}
					<RegisterUser />
					<Footer />
				</>
			{/* )} */}
		</div>
	);
}

export default App;
