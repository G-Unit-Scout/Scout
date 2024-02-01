import { useState } from "react"
import { useEffect } from "react";

const RegisterUser = () => {


// const [adminRole, setAdminRole] = useState(false);
// const [studentRole, setStudentRole] = useState(false);

const [email, setEmail] = useState('');
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');
const [cohortData, setCohortData] = useState([]);
const [cohort, setCohort] = useState(null);


//fetch all cohort data
useEffect(() => {
    const getCohorts = async() => {
        try {
            const res= await fetch('https://scouttestserver.onrender.com/api/cohorts');
            const data = await res.json();
            console.log(data)
            setCohortData(data)
        }catch(error) {
            console.log(error)
        }
    }
    getCohorts();
}, [])

const handleCohortChange = (e) => {
    if(e.target.value === 'Admin') {
        setCohort(null)
    } else {
        setCohort(e.target.value)
    }
}

const handleAdminRole = () => {
    console.log('admin selected')
    // setAdminRole(true)
    // setStudentRole(false)
    setRole(1)
}

const handleStudentRole = () => {
    console.log('student selected')
    // setStudentRole(true)
    // setAdminRole(false)
    setRole(0)
}

const handleRoleChange = (e) => {
    if(e.target.value === 'Admin') {
        handleAdminRole()
    } else if(e.target.value === 'Student') {
        handleStudentRole()
    }
}

const handleCreateAccount = async() => {
try{

    const reqbody = {
            email: email,
            user_name: name,
            password_hash: password,
            role: role,
            cohort_id: cohort
    }
    const bodyData = JSON.stringify(reqbody)
    const res = await fetch('https://scouttestserver.onrender.com/api/register', {
        method: 'POST',
        body: bodyData,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    if(res.ok) {
        let resData = await res.json();
        console.log(`user ${name} was added `, resData)
    } else {
        console.log('failed to add user')
    }
}catch(error) {
    console.log(error.stack)
}
}


    return (
        <>
        <div className='flex flex-col justify-center items-center h-screen w-absolute'>

            <div className='flex flex-col justify-start items-center h-[680px] w-[600px] bg-[rgba(13,15,74,255)] rounded-xl'>
                <div className='flex flex-col justify-center items-center bg-[rgba(239,110,71,255)] h-[120px] w-[600px] rounded-t-xl'>
                    <span className='text-[40px] font-bold text-white'>Register</span>
                </div>
            <div className='flex flex-col justify-center items-center h-[440px] w-[500px] bg-green-400 mt-5'>
                <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[90px] w-[500px]'>
                    <span>First and Last Name</span>
                    <input
                    id='name'
                    onChange={e => setName(e.target.value)}
                    className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-lg mt-[3px] bg-[rgba(22,26,40,255)] border-slate-700 h-[50px]'
                    type='text'
                    placeholder='Enter First and Last Name'
                    />
                </div>

                <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[90px] w-[500px]'>
                    <span>Email</span>
                    <input
                    id='email'
                    onChange={e => setEmail(e.target.value)}
                    className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-lg mt-[3px] bg-[rgba(22,26,40,255)] border-slate-700 h-[50px]'
                    type='text'
                    placeholder='Enter email'
                    />
                </div>
                <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[100px] w-[500px]'>
                    <span>Password</span>
                    <input
                    id='password'
                    onChange={e => setPassword(e.target.value)}
                    className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-lg mt-[3px] bg-[rgba(22,26,40,255)] border-slate-700 h-[50px]'
                    type='text'
                    placeholder='Enter Password'
                    />
                </div>
                {/* <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[100px] w-[500px]'>
                    <span>Cohort Id</span>
                    <input
                    id='email'
                    className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-xl mt-[3px] bg-[rgba(22,26,40,255)]'
                    type='text'
                    placeholder='Enter Cohort Id'
                    />

                </div> */}
                <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[80px] w-[500px]'>
                    <select value={cohort} onChange={handleCohortChange} className="select select-bordered w-full bg-[rgba(22,26,40,255)]">
                        <option disabled value=''>Select Cohort</option>
                        <option>Admin</option>
                        {cohortData.map((cohort) => (<option key={cohort.cohort_id} value={cohort.cohort_id}>{cohort.cohort_name}</option>))}
                    </select>
                </div>



                <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[80px] w-[500px]'>
                    <select onChange={handleRoleChange} value={role === 1 ? 'Admin' : role === 0 ? 'Student' : ''} className="select select-bordered w-full bg-[rgba(22,26,40,255)]">
                        <option disabled value=''>Select Role</option>
                        <option>Admin</option>
                        <option>Student</option>
                    </select>
                </div>


            </div>
                <div className='mt-3'>
                <button onClick={handleCreateAccount}className='h-[50px] w-[500px] bg-[rgba(239,110,71,255)] rounded-xl'>
                    <span className='text-white '>Create Account</span>
                </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default RegisterUser