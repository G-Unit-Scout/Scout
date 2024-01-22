import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import jsonData from '../TestData/TestUserKanbanData.json';





const StudentKanbanBoard = () => {
  // Helper functions to map column names to and from IDs
  const getColumnTitle = (columnId) => {
    const titles = ['Wishlist', 'Applied', 'Interview', 'Offer'];
    return titles[columnId - 1];
  };

  const openEditModal = (jobId) => {
    setEditJobDetails({ ...jobDetails[jobId] });
    document.getElementById(`${jobId}`).showModal();
  };
  
  // State for the columns and jobs
  const [columns, setColumns] = useState({});
  // State for job item details
  const [jobDetails, setJobDetails] = useState({});
  const [editJobDetails, setEditJobDetails] = useState({});


  
  // Initialize jobDetails state from JSON data
  useEffect(() => {
    const initialJobDetails = {};
    jsonData.forEach(job => {
      initialJobDetails[job.job_id] = {...job};
    });
    setJobDetails(initialJobDetails);
  }, []);

  // Handle changes in job details
  // const handleJobDetailChange = (jobId, key, value) => {
  //   setJobDetails(prev => ({
  //     ...prev,
  //     [jobId]: {
  //       ...prev[jobId],
  //       [key]: value
  //     }
  //   }));
  // };

  const handleUpdateJobDetails = (jobId) => {
    setJobDetails(prev => ({
      ...prev,
      [jobId]: { ...editJobDetails }
    }));
    document.getElementById(`${jobId}`).close(); // Close modal
  };
  

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
        {Object.entries(columns).map(([columnId, column], index) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              //===================== Droppable container or Columns =====================//
              <div className='rounded-lg border-[1px] min-w-80' {...provided.droppableProps} ref={provided.innerRef}>
                <div className='border-b-2 p-2'>
                  <h2 className='flex justify-center stat-value m-2'>{columnId}</h2>
                  <div className="flex justify-center stat-value m-2">{column.length}</div>
                  <button className='btn btn-outline btn-accent btn-sm w-full'>+</button>
                </div>
                {column.map((item, index) => (
                  <Draggable key={item.job_id} draggableId={String(item.job_id)} index={index}>
                    {(provided) => (
                      //===================== Draggable card or Jobs =====================//
                      <div className='card w-72 bg-[#0D0F4A] m-4'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="card-body">
                                <h2 className="card-title">{jobDetails[item.job_id]?.job_title || ''}</h2>
                                <p>{jobDetails[item.job_id]?.company || ''}</p>
                                <p className="badge badge-outline">{jobDetails[item.job_id]?.job_type || ''}</p>

                                {jobDetails[item.job_id]?.interview_status !== null && jobDetails[item.job_id]?.interview_status !== "null" && jobDetails[item.job_id]?.interview_status !== "" && (
                                  <p className="badge badge-outline">{jobDetails[item.job_id]?.interview_status || ''}</p>
                                )}
                                {/* <button className='btn btn-outline btn-accent btn-sm' onClick={()=>document.getElementById(`${item.job_id}`).showModal()}>Edit</button> */}
                                <button className='btn btn-outline btn-accent btn-sm' onClick={()=>openEditModal(item.job_id)}>Edit</button>
                            </div>

                            {/* ===================== Edit Modal Job Details Form ===================== */}
                            <dialog id={item.job_id} className="modal">
                              <div className="modal-box bg-[#000814]">
                                
                                <h3 className="font-bold text-lg">Job Title:</h3>
                                <input 
                                  type="text" 
                                  value={editJobDetails.job_title || ''} 
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, job_title: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Company:</p>
                                <input 
                                  type="text" 
                                  value={editJobDetails.company || ''} 
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, company: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Job Type:</p>
                                <input 
                                  type="text" 
                                  value={editJobDetails.job_type || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, job_type: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Location:</p>
                                <input 
                                  type="text" 
                                  value={editJobDetails.location || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, location: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Salary Range:</p>
                                <input 
                                  type="text" 
                                  value={editJobDetails.salary_range || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, salary_range: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Job URL:</p>
                                <input 
                                  type="text" 
                                  value={editJobDetails.post_url || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, post_url: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Interview Status:</p>
                                <input 
                                  type="text" 
                                  value={editJobDetails.interview_status || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, interview_status: e.target.value }))} 
                                  className="input input-bordered w-full" 
                                />

                                <p className="">Description:</p>
                                <textarea 
                                  className="textarea textarea-bordered w-full" 
                                  value={editJobDetails.description || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, description: e.target.value }))}
                                ></textarea>

                                <p className="">Notes</p>
                                <textarea 
                                  className="textarea textarea-bordered w-full" 
                                  value={editJobDetails.note_content || ''}  
                                  onChange={e => setEditJobDetails(prev => ({ ...prev, note_content: e.target.value }))}
                                ></textarea>

                                <button className='btn btn-outline btn-accent btn-sm' onClick={() => handleUpdateJobDetails(item.job_id)}>Update</button>

                              </div>
                              <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                              </form>
                            </dialog>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default StudentKanbanBoard;
