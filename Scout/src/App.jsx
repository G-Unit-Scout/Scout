import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import JobPostingsPage from "./components/JobPostingsPage";
import RegisterUser from "./components/RegisterUser";
import KanbanBoard from "./components/KanbanBoard";

function App() {
	const [count, setCount] = useState(0);
	const [jobPosting, setJobPosting] = useState(false);
	// if the user is verified in the backend then you can use this state for conditional rendering!
	const [verified, setVerified] = useState(false);
	const [userId, setUserId] = useState(0);
	const [notifications, setNotifications] = useState([]);
	const [announcements, setAnnouncements] = useState([]);
	const [userType, setUserType] = useState("admin");
	const [usersCohortId, setUsersCohortId] = useState(1);
	//state below it for dark mode/light mode functionality
	const [toggleMode, setToggleMode] = useState(false);
	const [theme, setTheme] = useState("dark");
	const [registerPage, setRegisterPage] = useState(false);
	const [userName, setUserName] = useState("");

	useEffect(() => {
		const getUser = async () => {
			const res = await fetch(
				`https://scouttestserver.onrender.com/api/user/${userId}`
			);
			const data = await res.json();

			setUserName(data[0].user_name);
			console.log(data);

			if (data[0].role == 1) {
				setUserType("admin");
			} else {
				setUserType("student");
			}
		};
		getUser();
	}, [userId]);

	useEffect(() => {
		// Update the theme based on the toggleMode state
		setTheme(toggleMode ? "light" : "dark");
	}, [toggleMode]);

	const handleToggle = (e) => {
		// Toggle the toggleMode state
		e.preventDefault();
		setToggleMode(!toggleMode);
	};

	const changeJobPosting = (boolean) => {
		setJobPosting(boolean);
	};

	const changeRegisterPage = (boolean) => {
		setRegisterPage(boolean);
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
	};

	const addNotifications = (data) => {
		setNotifications(data);
	};

	const addAnnouncements = (data) => {
		setAnnouncements(data);
	};

	return (
		<div className="font-galvanize" data-theme={theme}>
			{!verified ? (
				<AdminLogin setVerified={setVerified} fetchUser={fetchUser} />
			) : (
				<>
					<NavBar
						changeJobPosting={changeJobPosting}
						handleLogout={handleLogout}
						toggleMode={toggleMode}
						setToggleMode={setToggleMode}
						theme={theme}
						setTheme={setTheme}
						handleToggle={handleToggle}
						userId={userId}
						notifications={notifications}
						addNotifications={addNotifications}
						announcements={announcements}
						addAnnouncements={addAnnouncements}
						userType={userType}
						changeRegisterPage={changeRegisterPage}
						userName={userName}
					/>
					{registerPage ? (
						<RegisterUser />
					) : jobPosting ? (
						<JobPostingsPage
							userType={userType}
							user_id={userId}
							usersCohortId={usersCohortId}
						/>
					) : (
						<KanbanBoard
							userType={userType}
							user_id={userId}
							usersCohortId={usersCohortId}
						/>
					)}
					<Footer />
				</>
			)}
		</div>
	);
}

export default App;

//Was used to move between student and admin for testing
{
	/* <div className='flex justify-center'>
    <button className="btn btn-primary" onClick={toggleOption}>
        Toggle userType
    </button>
    <p>Current Data: userType: {userType} & user_id: {user_id} & cohort_id: {usersCohortId}</p>
    
</div> */
}
