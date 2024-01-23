import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import jsonData from '../TestData/TestUserKanbanData.json';
import KanbanColumn from './KanbanColumn';
import JobModal from './JobModal';





const StudentKanbanBoard = () => {
  
  // State for the columns and jobs
  const [columns, setColumns] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [editJobDetails, setEditJobDetails] = useState({});
  const [openModalId, setOpenModalId] = useState(null);



   // Helper functions to map column names to and from IDs
  const getColumnTitle = (columnId) => {
    const titles = ['Wishlist', 'Applied', 'Interview', 'Offer'];
    return titles[columnId - 1];
  };


  const openEditModal = (jobId) => {
    setEditJobDetails({ ...jobDetails[jobId] });
    setOpenModalId(jobId);
  };


  const closeModal = () => {
    console.log("close modal")
    setOpenModalId(null);
  };


  const handleUpdateJobDetails = (jobId) => {
    if (jobId === 'new') {
      // Logic for adding a new job
      // ...
    } else {
      // Updating an existing job
      setJobDetails(prev => ({
        ...prev,
        [jobId]: { ...editJobDetails }
      }));
    }
    closeModal();
  };


  useEffect(() => {
    // This effect runs whenever jobDetails changes
    const updatedColumns = {};
  
    Object.keys(columns).forEach(columnId => {
      updatedColumns[columnId] = columns[columnId].map(job => jobDetails[job.job_id] || job);
    });
  
    setColumns(updatedColumns);
  }, [jobDetails]);


  const handleJobDetailsChange = (updatedDetails) => {
    if (openModalId === 'new') {
      setNewJobDetails(updatedDetails);
    } else {
      setEditJobDetails(updatedDetails);
    }
  };

  
  // Initialize jobDetails state from JSON data
  useEffect(() => {
    const initialJobDetails = {};
    jsonData.forEach(job => {
      initialJobDetails[job.job_id] = {...job};
    });
    setJobDetails(initialJobDetails);
  }, []);


  // Initialize columns from the JSON data
  useEffect(() => {
    const columnsFromBackend = jsonData.reduce((acc, job) => {
      const columnTitle = getColumnTitle(job.column_id);
      if (!acc[columnTitle]) {
        acc[columnTitle] = [];
      }
      acc[columnTitle].push(job);
      return acc;
    }, {});
    setColumns(columnsFromBackend);
  }, []);


  // Handle drag end event
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list or no change
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Update columns state with the new job order
    setColumns(prev => {
      const newColumns = {...prev};
      const sourceJobs = [...newColumns[source.droppableId]];
      const [movedJob] = sourceJobs.splice(source.index, 1);
      newColumns[source.droppableId] = sourceJobs;

      const destinationJobs = [...newColumns[destination.droppableId]];
      destinationJobs.splice(destination.index, 0, movedJob);
      newColumns[destination.droppableId] = destinationJobs;

      return newColumns;
    });
  };







  return (
    <div className='flex justify-center mt-40'>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, columnData]) => (
          <KanbanColumn key={columnId} columnId={columnId} columnData={columnData} openEditModal={openEditModal} />
        ))}
      </DragDropContext>
      <JobModal 
        isOpen={Boolean(openModalId)} 
        jobDetails={openModalId === 'new' ? newJobDetails : editJobDetails} 
        onChange={handleJobDetailsChange} 
        onSave={() => handleUpdateJobDetails(openModalId)}
        onClose={closeModal}
      />
    </div>

  );
}

export default StudentKanbanBoard;


    // <div className='flex justify-center mt-40'>
    //   <DragDropContext onDragEnd={onDragEnd}>
    //     {Object.entries(columns).map(([columnId, column], index) => (
    //       <Droppable droppableId={columnId} key={columnId}>
    //         {(provided) => (
    //           //===================== Droppable container or Columns =====================//
    //           <div className='rounded-lg border-[1px] min-w-80' {...provided.droppableProps} ref={provided.innerRef}>
    //             <div className='border-b-2 p-2'>
    //               <h2 className='flex justify-center stat-value m-2'>{columnId}</h2>
    //               <div className="flex justify-center stat-value m-2">{column.length}</div>
    //               <button className='btn btn-outline btn-sm w-full text-lg'>+</button>
    //             </div>
    //             {column.map((item, index) => (
    //               <Draggable key={item.job_id} draggableId={String(item.job_id)} index={index}>
    //                 {(provided) => (
    //                   //===================== Draggable card or Jobs =====================//
    //                   <div className='card w-72 bg-[#0D0F4A] m-4'
    //                         ref={provided.innerRef}
    //                         {...provided.draggableProps}
    //                         {...provided.dragHandleProps}
    //                         onClick={() => openEditModal(item.job_id)} 
    //                     >
    //                         <div className="card-body">
    //                             <h2 className="card-title">{jobDetails[item.job_id]?.job_title || ''}</h2>
    //                             <p>{jobDetails[item.job_id]?.company || ''}</p>
    //                             <p className={`badge badge-outline ${
    //                                 jobDetails[item.job_id]?.location?.toLowerCase() === 'remote' 
    //                                   ? 'badge-accent' 
    //                                   : jobDetails[item.job_id]?.location?.toLowerCase().includes('hybrid') 
    //                                     ? 'badge-secondary' 
    //                                     : 'badge-primary'
    //                               }`}>
    //                                 {jobDetails[item.job_id]?.location || ''}
    //                             </p>

    //                             {jobDetails[item.job_id]?.interview_status !== null && jobDetails[item.job_id]?.interview_status !== "null" && jobDetails[item.job_id]?.interview_status !== "" && (
    //                               <p className="badge badge-outline">{jobDetails[item.job_id]?.interview_status || ''}</p>
    //                             )}
    //                             {/* <button className='btn btn-outline btn-accent btn-sm' onClick={()=>document.getElementById(`${item.job_id}`).showModal()}>Edit</button> */}
    //                             {/* <button className='btn btn-outline btn-accent btn-sm' onClick={()=>{openEditModal(item.job_id)}}>Edit</button> */}
    //                         </div>

    //                         {/* ===================== Edit Modal Job Details Form ===================== */}
    //                         {openModalId === item.job_id && (
    //                         <dialog open className="modal">
    //                           <div className="modal-box bg-[#000814]">

    //                             <h3 className="font-bold text-lg">Job Title:</h3>
    //                             <input 
    //                               type="text" 
    //                               value={editJobDetails.job_title || ''} 
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, job_title: e.target.value }))} 
    //                               className="input input-bordered w-full" 
    //                             />

    //                             <div className="divider"></div>

    //                             <p className="font-bold">Company:</p>
    //                             <input 
    //                               type="text" 
    //                               value={editJobDetails.company || ''} 
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, company: e.target.value }))} 
    //                               className="input input-bordered w-full" 
    //                             />

    //                             <div className='flex flex-col'>
    //                               <div className='flex flex-row'>
    //                                 <p className="basis-1/2 font-bold">Job Type:</p>
    //                                 <p className="basis-1/2 font-bold ml-4">Salary Range:</p>
    //                               </div>
    //                               <div className='flex flex-row'>
    //                                 <input 
    //                                   type="text" 
    //                                   value={editJobDetails.job_type || ''}  
    //                                   onChange={e => setEditJobDetails(prev => ({ ...prev, job_type: e.target.value }))} 
    //                                   className="basis-1/2 input input-bordered mr-2" 
    //                                 />
    //                                 <input 
    //                                   type="text" 
    //                                   value={editJobDetails.salary_range || ''}  
    //                                   onChange={e => setEditJobDetails(prev => ({ ...prev, salary_range: e.target.value }))} 
    //                                   className="basis-1/2 input input-bordered ml-2" 
    //                                 />
    //                               </div>
    //                             </div>

    //                             <p className="font-bold">Location:</p>
    //                             <input 
    //                               type="text" 
    //                               value={editJobDetails.location || ''}  
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, location: e.target.value }))} 
    //                               className="input input-bordered w-full" 
    //                             />

    //                             <div className="divider"></div>

    //                             <p className="font-bold">Job URL: <a className="link link-primary">TEST</a></p>
    //                             <input 
    //                               type="text" 
    //                               value={editJobDetails.post_url || ''}  
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, post_url: e.target.value }))} 
    //                               className="input input-bordered w-full" 
    //                             />

    //                             <p className="font-bold">Interview Status:</p>
    //                             <input 
    //                               type="text" 
    //                               value={editJobDetails.interview_status || ''}  
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, interview_status: e.target.value }))} 
    //                               className="input input-bordered w-full" 
    //                             />

    //                             <div className="divider"></div>

    //                             <p className="font-bold">Description:</p>
    //                             <textarea 
    //                               className="textarea textarea-bordered w-full" 
    //                               value={editJobDetails.description || ''}  
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, description: e.target.value }))}
    //                             ></textarea>

    //                             <p className="font-bold">Notes:</p>
    //                             <textarea 
    //                               className="textarea textarea-bordered w-full" 
    //                               value={editJobDetails.note_content || ''}  
    //                               onChange={e => setEditJobDetails(prev => ({ ...prev, note_content: e.target.value }))}
    //                             ></textarea>

    //                             <div className='flex justify-center'>
    //                             <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={(e) => {e.stopPropagation(); handleUpdateJobDetails(item.job_id)}}>Update</button>
    //                             </div>

    //                           </div>
    //                           <form method="dialog" className="modal-backdrop" onClick={(e) => {e.stopPropagation(); closeModal();}}>
    //                             <button>close</button>
    //                           </form>
    //                         </dialog>
    //                         )}
    //                   </div>
    //                 )}
    //               </Draggable>
    //             ))}
    //             {provided.placeholder}
    //           </div>
    //         )}
    //       </Droppable>
    //     ))}
    //   </DragDropContext>
    // </div>