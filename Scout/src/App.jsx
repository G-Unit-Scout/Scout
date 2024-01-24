import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import AdminLogin from './components/AdminLogin'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
     <button className='btn btn-primary'>It Worked!</button>
     {/* <AdminLogin/> */}
    <Footer />
    </>
  )
}

export default App
