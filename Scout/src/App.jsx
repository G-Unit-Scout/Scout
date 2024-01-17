import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <button className='btn btn-primary'>It Worked!</button>
    </>
  )
}

export default App
