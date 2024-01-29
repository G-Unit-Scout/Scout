import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import JobModal from './JobModal';
import jsonData from '../TestData/TestCohortKanban.json';

const AdminKanbanBoard = ({ cohortId }) => {
  const [columns, setColumns] = useState({});
  const [openModalId, setOpenModalId] = useState(null);

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

  // Fetch data based on cohortId and organize it for the Kanban board
  useEffect(() => {
    // Fetch data logic
  }, [cohortId]);




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
    </div>
  );
};

export default AdminKanbanBoard;
