import { useState } from "react"

const AdminLogin = () => {

const [login, setlogin] = useState(false)

return (
    <>
      <div className='flex flex-col justify-center items-center h-screen w-absolute bg-white'>
        <div className='flex flex-col justify-center items-center h-screen absolute bg-blue-400'>
          <input
            className='placeholder-gray-500 border border-gray-300 p-2 mb-2'
            type='text'
            placeholder='Enter your first name'
          />
          <input
            className='placeholder-gray-500 border border-gray-300 p-2'
            type='text'
            placeholder='Enter your last name'
          />
        </div>
      </div>
    </>
  );
  
}

export default AdminLogin