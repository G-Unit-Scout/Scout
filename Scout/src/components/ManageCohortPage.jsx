import { useState } from "react"
import { useEffect } from "react";

const ManageCohortPage = () => {

  const [newCohortName, setNewCohortName] = useState('');
  const [cohortOption, setCohortOption] =  useState(null);
  const [cohortName, setCohortName] = useState('');
  const [deleteValue, setDeleteValue] = useState('');
  const [cohortData, setCohortData] = useState([]);
  const [cohort, setCohort] = useState(null);

    useEffect(() => {
      const getCohorts = async() => {
          try {
              const res= await fetch('https://scouttestserver.onrender.com/api/cohorts');
              const data = await res.json();
              setCohortData(data)
          }catch(error) {
              console.log(error)
          }
      }
      getCohorts();
  }, [])

  const handleNewCohort = async (e) => {
    try {
      const reqbody = {
        cohortName : newCohortName
      }
      const bodyData = JSON.stringify(reqbody)
      const response = await fetch(`https://scouttestserver.onrender.com/api/cohorts` , {
        method: 'PUT',
        body: bodyData,
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      if(response.ok) {
        let responseData = await response.json();
        console.log(`Cohort ${responseData[0].cohort_name} successfully created`)
      } else {
        console.log(`Failed to add cohort`)
      }
    } catch(error) {
      console.error(`Error adding cohort ${error.stack}`)
    }
  }

  const handleDelCohort = async (e) => {
    if ( deleteValue === 'DELETE') {
      try {
        const reqbody = {
          cohortName : cohortName
        };
        const bodyData = JSON.stringify(reqbody);
        const response = await fetch(`https://scouttestserver.onrender.com/api/cohorts` , {
          method: 'DELETE',
          body: bodyData,
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        if(response.ok) {
          let responseData = await response.json()
          console.log(`Cohort ${responseData[0].cohort_name} successfully deleted`)
        } else {
          console.log(`Failed to delete cohort`)
        }
      } catch(error) {
        console.error(`Error deleting cohort ${error.stack}`)
      }
    } else {
      console.log('Failed to delete')
    }
  }

  const handleCreateChange = (e) => {
    setCohortOption(1);
  }

  const handleDeleteChange = (e) => {
    setCohortOption(0);
  }

  const handleNullChange = (e) => {
    setCohortOption(null);
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen w-absolute text-white'>

        { cohortOption === null &&
        <div className='flex flex-col justify-center items-center h-[455px] w-[600px] bg-[rgba(13,15,74,255)] rounded-xl'>
          <div className='flex flex-col justify-inherit mt-3'>
            <button onClick={handleCreateChange} className='h-[150px] w-[275px] m-[30px] p-[10px] bg-[rgba(239,110,71,255)] rounded-xl'>
              <span className='text-[40px] font-bold text-white'>Add New Cohort</span>
            </button>
            <button onClick={handleDeleteChange} className='h-[150px] w-[275px] m-[30px] p-[10px] bg-[rgba(239,110,71,255)] rounded-xl'>
              <span className='text-[40px] font-bold text-white'>Delete Cohort</span>
            </button>
          </div>
        </div>
        }
        { cohortOption === 1 &&
         <div className='flex flex-col justify-start items-center h-[455px] w-[600px] bg-[rgba(13,15,74,255)] rounded-xl'>
        <div className='flex flex-col justify-center items-center bg-[rgba(239,110,71,255)] h-[120px] w-[600px] rounded-t-xl'>
            <span className='text-[40px] font-bold text-white'>New Cohort</span>
        </div>
        <div className='flex flex-col justify-center items-center h-[300px] w-[500px]'>
            <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[90px] w-[500px]'>
                <span>Cohort Name</span>
                <input
                id='name'
                onChange={e => setNewCohortName(e.target.value)}
                className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-lg mt-[3px] bg-[rgba(22,26,40,255)] border-slate-700 h-[50px]'
                type='text'
                placeholder='Enter Cohort Name'
                />
            </div>
        </div>
            <div className='mt-3'>
            <button onClick={handleNewCohort, handleNullChange}className='h-[50px] w-[500px] mb-[25px] bg-[rgba(239,110,71,255)] rounded-xl'>
                <span className='text-white '>Create Cohort</span>
            </button>
            </div>
        </div>
      }
      { cohortOption === 0 &&
               <div className='flex flex-col justify-start items-center h-[455px] w-[600px] bg-[rgba(13,15,74,255)] rounded-xl'>
               <div className='flex flex-col justify-center items-center bg-[rgba(239,110,71,255)] h-[120px] w-[600px] rounded-t-xl'>
                   <span className='text-[40px] font-bold text-white'>Delete Cohort</span>
               </div>
               <div className='flex flex-col justify-center items-center h-[300px] w-[500px]'>
               <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[80px] w-[500px]'>
                    <select value={cohort} onChange={e => setCohort(e.target.value)} className="select select-bordered w-full mt-[20px] bg-[rgba(22,26,40,255)]">
                        <option disabled value=''>Select Cohort</option>
                        {cohortData.map((cohort) => (<option key={cohort.cohort_id} value={cohort.cohort_id}>{cohort.cohort_name}</option>))}
                    </select>
                </div>
                   <div className='flex flex-col bg-[rgba(13,15,74,255)] h-[90px] w-[500px]'>
                   <span className=' ml-[10px]'>!WARNING! When deleting a cohort, all accounts and job status boards assigned to that cohort will be deleted as well. <br/>
                  Please type DELETE below to verify cohort deletion</span>
                       <span className='ml-[10px]'> <br />Confirm Deletion</span>
                   </div>
               </div>
               <input
                       id='name'
                       onChange={e => setDeleteValue(e.target.value)}
                       className='placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-lg mb-[100pxmt-[3px] bg-[rgba(22,26,40,255)] border-slate-700 h-[50px] w-[500px] m-[20px]'
                       type='text'
                       placeholder='Please Type DELETE'
                       />
                   <div className='mt-3'>
                   <button onClick={handleDelCohort, handleNullChange}className='h-[50px] w-[500px] mt-[25px] mb-[25px] bg-[rgba(239,110,71,255)] rounded-xl'>
                       <span className='text-white '>Delete Cohort</span>
                   </button>
                   </div>
               </div>
      }

       </div>
    </>
  )
}

export default ManageCohortPage;