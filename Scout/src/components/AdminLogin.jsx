import { useState } from "react"

const AdminLogin = () => {

const [login, setlogin] = useState(false)

return (
    <>
      <div className='flex flex-col justify-center items-center h-screen w-absolute bg-white'>
        <div className='flex flex-col items-center h-[800px] w-[600px] absolute bg-blue-400 rounded-xl'>
            <div className='flex flex-col justify-center items-center bg-[rgba(239,110,71,255)] h-[100px] w-[500px]'>
                <span className='text-[40px] font-bold text-white'>Login</span>
            </div>

            <div className='flex flex-col justify-center items-center h-[300px] w-[600px] bg-[rgba(13,15,74,255)] mt-[100px]'>
              
              <div className='flex flex-col bg-red-400 h-[100px] w-[500px]'>
                <span className='text-white'>Email</span>
                <input
                id='email'
                className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-xl'
                type='text'
                placeholder='Enter email'
                />
                </div>

                <div className='flex flex-col bg-yellow-400 h-[100px] w-[500px]'>
                    <span className='text-white'>Password</span>
                    <input
                    id='password'
                    className='placeholder-gray-500 border border-gray-300 p-2 rounded-xl'
                     type='text'
                    placeholder='Enter password'
                    />
                </div>  
                
            </div>
          
          
        </div>
      </div>
    </>
  );
  
}

export default AdminLogin