import { useState } from "react"

const AdminLogin = () => {

const [login, setLogin] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLoginSubmit = async (email, password) => {
    const loginUrl = "http://localhost:3000/login";
    const body = {
        email: email,
        password: password,
    };

    try {
        const res = await axios.post(loginUrl, body);
        console.log(res.data);
        setUser_id(res.data.id);
        setLogin(true);
        setEmail(email);
    } catch (error) {
        console.error(error.stack);
    }
};

const handleLogin = (e) => {
    e.preventDefault();
    
    //pass the username and password to the handleLoginSubmit function prop
    handleLoginSubmit(email, password);
}





return (
    <>
      <div className='flex flex-col justify-center items-center h-screen w-absolute bg-white'>
        <div className='flex flex-col items-center h-[530px] w-[600px] absolute bg-[rgba(13,15,74,255)] rounded-xl'>
            <div className='flex flex-col justify-center items-center bg-[rgba(239,110,71,255)] h-[120px] w-[600px] rounded-t-xl'>
                <span className='text-[40px] font-bold text-white'>Login</span>
            </div>

            <div className='flex flex-col justify-center items-center h-[300px] w-[600px] bg-[rgba(13,15,74,255)] mt-[40px]'>
              
              <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[100px] w-[500px]'>
                <span className='text-white'>Email</span>
                <input
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-xl mt-[3px] bg-[rgba(22,26,40,255)]'
                type='text'
                placeholder='Enter email'
                />
                </div>

                <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[100px] w-[500px]'>
                    <span className='text-white'>Password</span>
                    <input
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='placeholder-gray-500 border border-gray-300 p-2 rounded-xl mt-[3px] bg-[rgba(22,26,40,255)]'
                     type='text'
                    placeholder='Enter password'
                    />
                </div>  
                <div className='mt-3'>
                <button onClick={handleLogin} className='h-[50px] w-[500px] bg-[rgba(239,110,71,255)] rounded-xl'>
                    <span className='text-white '>Sign In</span>
                </button>
                </div>
            </div>
            
          
        </div>
      </div>
    </>
  );
  
}

export default AdminLogin