import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import StudentKanbanBoard from "./components/StudentKanbanBoard";
import AdminLogin from "./components/AdminLogin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import JobPostingsPage from "./components/JobPostingsPage";
import RegisterUser from "./components/RegisterUser";
import AdminKanbanBoard from "./components/AdminKanbanBoard";
import Settings from "./components/Settings";

function App() {
	const [count, setCount] = useState(0);
	const [jobPosting, setJobPosting] = useState(false);
	// if the user is verified in the backend then you can use this state for conditional rendering!!!!!!!!!!!!!!!!!!!!!
	const [verified, setVerified] = useState(false);
	const [userId, setUserId] = useState(0);

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

	return (
		<div className="font-galvanize">
			{/* {!verified ? ( */}
				{/* <AdminLogin setVerified={setVerified} fetchUser={fetchUser} /> */}
			{/* ) : ( */}
				<>
					<NavBar changeJobPosting={changeJobPosting} handleLogout={handleLogout} />
					{/* {jobPosting ? <JobPostingsPage /> : <StudentKanbanBoard />} */}
					{/* <RegisterUser /> */}
					{/* <Footer /> */}
          <Settings/>
				</>
			{/* )} */}
		</div>
	);
}

export default App;
