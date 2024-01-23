import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import AdminLogin from './components/AdminLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <button className='btn btn-primary'>It Worked!</button>
     <AdminLogin/>
    </>
  )
}

export default App
