import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import StudentKanbanBoard from './Components/StudentKanbanBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <button className='btn btn-primary'>It Worked!</button> */}
     <StudentKanbanBoard />
    </>
  )
}

export default App
