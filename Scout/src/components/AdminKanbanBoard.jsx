import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import JobModal from './JobModal';
import jsonData from '../TestData/TestCohortKanban.json';

const AdminKanbanBoard = ({ cohortId }) => {
  const [columns, setColumns] = useState({});
  const [openModalId, setOpenModalId] = useState(null);
  const [editJobDetails, setEditJobDetails] = useState({});
  const [jobDetails, setJobDetails] = useState({});

  // Other states like jobDetails, editJobDetails, etc.





     // Helper functions to map column names to and from IDs
     const getColumnTitle = (columnId) => {
        const titles = ['Wishlist', 'Applied', 'Interview', 'Offer', 'No Response'];
        return titles[columnId - 1];
      };


      const openEditModal = (jobId, columnId = 1) => {
        if (jobId === 'new') {
          setNewJobDetails({
            job_id: null,
            job_title: "",
            description: "",
            company: "",
            location: "",
            salary_range: "",
            is_admin: false,
            post_url: "",
            job_type: "",
            interview_status: null,
            column_id: columnId,
            row_num: 1,
            note_content: ""
          });
        } else {
          setEditJobDetails({ ...jobDetails[jobId] });
        }
        setOpenModalId(jobId);
      };


      

  const closeModal = () => {
    console.log("close modal")
    setOpenModalId(null);
  };

  const handleDeleteJob = (jobId) => {
    if (jobId && jobId !== 'new') {
      // Remove from jobDetails
      setJobDetails(prev => {
        const newJobDetails = { ...prev };
        delete newJobDetails[jobId];
        return newJobDetails;
      });
  
      // Remove from columns
      setColumns(prev => {
        const newColumns = { ...prev };
        Object.keys(newColumns).forEach(columnId => {
          newColumns[columnId] = newColumns[columnId].filter(job => job.job_id !== jobId);
        });
        return newColumns;
      });
    }
    closeModal();
  };



    // Initialize jobDetails state from JSON data
    useEffect(() => {
        const initialJobDetails = {};
        jsonData.forEach(job => {
          initialJobDetails[job.job_id] = {...job};
        });
        setJobDetails(initialJobDetails);
      }, []);



      const handleJobDetailsChange = (updatedDetails) => {
        if (openModalId === 'new') {
          setNewJobDetails(updatedDetails);
        } else {
          setEditJobDetails(updatedDetails);
        }
      };


      // Initialize columns based on titles
const initializeColumns = (titles) => {
    const columns = {};
    titles.forEach((title, index) => {
      columns[title] = [];
    });
    return columns;
  };
  
  // Populate columns with JSON data
  const populateColumnsWithData = (jsonData, columns) => {
    jsonData.forEach(job => {
      const columnTitle = getColumnTitle(job.column_id);
      if (columns[columnTitle]) {
        columns[columnTitle].push(job);
      }
    });
    return columns;
  };

 // Usage
useEffect(() => {
    const initialColumns = initializeColumns(['Wishlist', 'Applied', 'Interview', 'Offer', 'No Response']);
    const populatedColumns = populateColumnsWithData(jsonData, initialColumns);
    setColumns(populatedColumns);
  }, [jsonData]);














  // Handlers for drag & drop, modal open/close, etc.
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
      {/* JobModal component for editing and adding new jobs */}
      <JobModal 
        isOpen={openModalId} 
        jobDetails={openModalId === 'new' ? newJobDetails : editJobDetails} 
        onChange={handleJobDetailsChange} 
        onSave={() => handleUpdateJobDetails(openModalId)}
        onClose={closeModal}
        onDelete={handleDeleteJob}
      />
    </div>
  );
};

export default AdminKanbanBoard;
