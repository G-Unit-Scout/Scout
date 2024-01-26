import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
//import jsonData from '../TestData/TestUserKanbanData.json';
import studentjsonData from '../TestData/TestUserKanbanData_v2.json';
import cohortjsonData from '../TestData/TestCohortKanban.json';
import KanbanColumn from './KanbanColumn';
import JobModal from './JobModal';





const StudentKanbanBoard = ({userType}) => {

  const initialNewJobDetails = {
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
    column_id: 1,
    row_num: 1,
    note_content: ""
  }


  //===========================State Hooks===========================//


  // State for the columns and jobs
  const [columns, setColumns] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [editJobDetails, setEditJobDetails] = useState({});
  const [openModalId, setOpenModalId] = useState(null);
  const [newJobDetails, setNewJobDetails] = useState(initialNewJobDetails);
  const [jsonData, setJsonData] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(undefined); // New state for selected cohort
  const [allCohorts, setAllCohorts] = useState([]); // State to hold all cohorts (for admin)
  const [allStudents, setAllStudents] = useState([]); // State to hold all cohorts (for admin)
  const [selectedStudent, setSelectedStudent] = useState(undefined); // New state for selected cohort



  //===========================Helper Functions===========================//


  // Helper functions to map column names to and from IDs
  const getColumnTitle = (columnId) => {
  const titles = ['Wishlist', 'Applied', 'Interview', 'Offer', 'No Response'];
  return titles[columnId - 1];
  };


  //===========================useEffect Hooks===========================//

  // In your KanbanBoard component
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch cohorts
            // const responseCohorts = await fetch('https://scouttestserver.onrender.com/api/cohorts');
            // const apiCohort = await responseCohorts.json();
            // console.log("apiCohort:", apiCohort)

            // Fetch users
            // const responseUsers = await fetch('https://scouttestserver.onrender.com/api/users');
            // const apiUsers = await responseUsers.json();
            // console.log("apiUsers", apiUsers)


            // Fetch cohort kanban by id
            // const responseCohortsKanbanById = await fetch('https://scouttestserver.onrender.com/api/cohortkanban/2');
            // const apiCohortsKanbanById = await responseCohortsKanbanById.json();
            // console.log("apiCohortsKanbanById:", apiCohortsKanbanById)
            
            // Fetch student kanban by id
            const responseStudentKanbanById = await fetch('https://scouttestserver.onrender.com/api/cohortkanban/2');
            const apiStudentsKanbanById = await responseStudentKanbanById.json();
            setJsonData(apiStudentsKanbanById)
            console.log("apiStudentsKanbanById:", apiStudentsKanbanById)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, []);




  useEffect(() => {
    if (userType === 'admin') {
      // Initialize with empty array for admin until a cohort is selected
      setJsonData([]);
      const cohorts = fetchCohorts(cohortjsonData);
      setAllCohorts(cohorts);
    } else {
      // Fetch individual student data
      setJsonData(studentjsonData);
    }
  }, [userType]);
  




  useEffect(() => {
    let data;
    if (userType === 'admin') {
      if (selectedCohort) {
        // Fetch data for the selected cohort
        data = fetchDataForCohort(selectedCohort);
        const students = fetchStudents(data);
        setAllStudents(students);
      } else {
        data = []; // No data if no cohort is selected
        setAllStudents([]); // Also reset allStudents when no cohort is selected
      }
    } else {
      // Fetch individual student data
      data = studentjsonData;
    }
    setJsonData(data);
  }, [selectedCohort, userType]);

  

  useEffect(() => {
    let data;
    if (userType === 'admin') {
      if (selectedStudent) {
        //console.log("SELECTED STUDENT IN useEffect:", selectedStudent)
        // Fetch data for the selected cohort
        data = fetchStudentDataForCohort(selectedStudent);
      } else {
        //console.log("ELSE SELECTED STUDENT IN useEffect:", selectedStudent)
        //data = []; // No data if no cohort is selected
        data = fetchDataForCohort(selectedCohort, selectedStudent);
      }
    } else {
      // Fetch individual student data
      data = studentjsonData;
    }
    setJsonData(data);
  }, [selectedStudent]);

  //console.log("SELECTED STUDENT OUT OF useEffect:", selectedStudent)
  
  // Initialize jobDetails state from JSON data
  useEffect(() => {
    const initialJobDetails = {};
    jsonData.forEach(job => {
      initialJobDetails[job.job_id] = {...job};
    });
    setJobDetails(initialJobDetails);
  }, [jsonData]);


  // Usage
  useEffect(() => {
    const initialColumns = initializeColumns(['Wishlist', 'Applied', 'Interview', 'Offer', 'No Response']);
    const populatedColumns = populateColumnsWithData(jsonData, initialColumns);
    setColumns(populatedColumns);
  }, [jsonData]);


  //===========================Event Handlers===========================//


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


  const handleUpdateJobDetails = (jobId) => {
    const validateJobDetails = (details) => {
      // Add your validation logic here
      // Example: Check if job title is empty
      if (!details.job_title.trim()) {
        alert('Please fill out the job title.');
        return false;
      }
      // Add other required field checks as needed
      return true;
    };

    if (jobId === 'new') {
      if (!validateJobDetails(newJobDetails)) {
        return; // Stop if validation fails
      }
      const newJobId = `job_${new Date().getTime()}`;
      
      setJobDetails(prev => ({
        ...prev,
        [newJobId]: { ...newJobDetails, job_id: newJobId }
      }));
  
      const newJobColumn = getColumnTitle(1); // Assuming new jobs go to the first column
      setColumns(prev => ({
        ...prev,
        [newJobColumn]: [...(prev[newJobColumn] || []), { ...newJobDetails, job_id: newJobId }]
      }));
    } else {
      if (!validateJobDetails(editJobDetails)) {
        return; // Stop if validation fails
      }
      // Updating an existing job
      setJobDetails(prev => ({
        ...prev,
        [jobId]: { ...editJobDetails }
      }));
    }
    closeModal();
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


  const handleJobDetailsChange = (updatedDetails) => {
    if (openModalId === 'new') {
      setNewJobDetails(updatedDetails);
    } else {
      setEditJobDetails(updatedDetails);
    }
  };


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


  const fetchCohorts = (jsonData) => {
    const cohortIds = new Set();
    jsonData.forEach(item => {
      //console.log(item)
      if (item.cohort_id) {
        cohortIds.add(item.cohort_id);
      }
    });
    return Array.from(cohortIds);
  };

  // const fetchStudents = (data) => {
  //   const studentIds = new Set();
  //   data.forEach(item => {
  //     //console.log("item", item)
  //     if (item.user_name) {
  //       studentIds.add(item.user_name);
  //     }
  //   });
  //   return Array.from(studentIds);
  // };

  const fetchStudents = (data) => {
    const studentNames = new Set();
    data.forEach(item => {
        if (item.user_name) {
            studentNames.add(item.user_name);
        }
    });
    return Array.from(studentNames);
};

  

  // JSX for the cohort selection dropdown (render only for admin)
  const cohortSelectionDropdown = userType === 'admin' && (
    <select className="select select-bordered mx-4" value={selectedCohort} onChange={(e) => setSelectedCohort(e.target.value)}>
      <option value="">Select Cohort</option>
      {allCohorts.map(cohort => (
        //console.log(cohort)
        <option key={cohort} value={cohort}>{cohort}</option>
      ))}
    </select>
  )



  // JSX for the student selection dropdown (render only for admin)
const studentSelectionDropdown = userType === 'admin' && (
  <select className="select select-bordered mx-4" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
    <option value="">Select Student</option>
    {/* {console.log("allStudents:===", allStudents)} */}
    {allStudents.map(student => (
      <option key={student} value={student}>{student}</option>
    ))}
  </select>
);

  const fetchDataForCohort = (selectedCohort) => {
    // Filter the jsonData to return only those jobs that belong to the specified cohort
    return cohortjsonData.filter(job => job.cohort_id === selectedCohort);
  };



  const fetchStudentDataForCohort = (selectedStudent) => {
    //console.log("selectedStudent IN fetchStudentDataForCohort:===", selectedStudent);
    // Filter the jsonData to return only those jobs that belong to the specified cohort
    return cohortjsonData.filter(job => job.cohort_id === selectedCohort && job.user_name === selectedStudent);
  };

//console.log("allStudents:===", allStudents)
  //===========================Initialize and Populate Columns===========================//


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


  //===========================JSX Return===========================//


  return (
    <div className='mb-10'>
      <div className='flex flex-row justify-center'>
        {cohortSelectionDropdown}
        {studentSelectionDropdown}
      </div>
      <div className='flex justify-center mt-4'>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, columnData]) => (
            <KanbanColumn key={columnId} columnId={columnId} columnData={columnData} openEditModal={openEditModal} />
          ))}
        </DragDropContext>
        <JobModal 
          isOpen={openModalId} 
          jobDetails={openModalId === 'new' ? newJobDetails : editJobDetails} 
          onChange={handleJobDetailsChange} 
          onSave={() => handleUpdateJobDetails(openModalId)}
          onClose={closeModal}
          onDelete={handleDeleteJob}
        />
      </div>
    </div>

  );
}

export default StudentKanbanBoard;