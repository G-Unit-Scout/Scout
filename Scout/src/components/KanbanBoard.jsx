import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import jsonData from '../TestData/TestUserKanbanData.json';
// import studentjsonData from '../TestData/TestUserKanbanData_v2.json';
// import cohortjsonData from '../TestData/TestCohortKanban.json';
import KanbanColumn from './KanbanColumn';
import JobModal from './JobModal';





const KanbanBoard = ({userType, user_id, usersCohortId}) => {

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
    row_num: 8,
    note_content: ""
  }


  //===========================State Hooks===========================//


  // State for the columns and jobs
  const [columns, setColumns] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [editJobDetails, setEditJobDetails] = useState({});
  const [openModalId, setOpenModalId] = useState(null);
  const [newJobDetails, setNewJobDetails] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [cohortjsonData, setCohortjsonData] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(undefined); // New state for selected cohort
  const [allCohorts, setAllCohorts] = useState([]); // State to hold all cohorts (for admin)
  const [allStudents, setAllStudents] = useState([]); // State to hold all cohorts (for admin)
  const [selectedStudent, setSelectedStudent] = useState(undefined); // New state for selected cohort
  const [needRefresh, setNeedRefresh] = useState(false);



  //===========================Helper Functions===========================//


  // Helper functions to map column names to and from IDs
  const getColumnTitle = (columnId) => {
    const titles = ['Wishlist', 'Applied', 'Interview', 'Offer', 'No Response'];
    if (columnId >= 1 && columnId <= titles.length) {
      return titles[columnId - 1];
    } else {
      // If columnId is out of range, map it to a default column, e.g., 'No Response'
      return 'Wishlist';
    }
  };
  


  //===========================useEffect Hooks===========================//


  // Fetching student kanban data when userType is student
useEffect(() => {
  if (userType === 'student') {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`https://scouttestserver.onrender.com/api/studentkanban/${user_id}`);
        const data = await response.json();
        setJsonData(data);
        console.log("data In fetch:", data)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
    setNeedRefresh(false);
  }
}, [userType, needRefresh]);



useEffect(() => {
  if (userType === 'admin') {
    const fetchCohortsData = async () => {
      try {
        const response = await fetch('https://scouttestserver.onrender.com/api/cohorts');
        const data = await response.json();
        setAllCohorts(data.map(cohort => ({
          id: cohort.cohort_id,
          name: cohort.cohort_name
        })));
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchCohortsData();
  }
}, [userType]);


useEffect(() => {
  if (userType === 'admin' && selectedCohort) {
    const fetchCohortData = async () => {
      try {
        const response = await fetch(`https://scouttestserver.onrender.com/api/cohortkanban/${selectedCohort}`);
        const data = await response.json();
        setJsonData(data);
        setCohortjsonData(data);
      } catch (error) {
        console.error('Error fetching cohort data:', error);
      }
    };

    fetchCohortData();
  } else if (userType === 'admin') {
    setJsonData([]); // Reset when no cohort is selected
    setAllStudents([]);
    setCohortjsonData([]);
    setSelectedStudent(undefined);
  }
}, [userType, selectedCohort, needRefresh]);



useEffect(() => {
  if (userType === 'admin') {
    const fetchStudentsData = async () => {
      try {
        const response = await fetch('https://scouttestserver.onrender.com/api/users');
        const users = await response.json();
        const students = users.filter(user => user.cohort_id === selectedCohort);
        setAllStudents(students.map(student => ({
          id: student.user_id,
          name: student.user_name
        })));
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (selectedCohort) {
      fetchStudentsData();
    }
  }
}, [userType, selectedCohort, needRefresh]);




// Fetching data for selected student within a cohort for admin view
useEffect(() => {
  if (userType === 'admin' && selectedStudent) {
    console.log("selectedStudent",selectedStudent)
    const data = fetchStudentDataForCohort(selectedStudent); // Adjust this function to fetch from API
    setJsonData(data);
    console.log("AllStudents", allStudents)
  } else if (userType === 'admin') {
    // const data = fetchDataForCohort(selectedCohort);
    // setJsonData(data);
    setJsonData(cohortjsonData);
  }
}, [userType, selectedStudent, needRefresh]);

// Update jobDetails and columns when jsonData changes
useEffect(() => {
  //console.log("jsonData IN useEffect:", jsonData)
  const initialJobDetails = {};
  jsonData.forEach(job => {
    initialJobDetails[job.job_id] = { ...job };
  });
  setJobDetails(initialJobDetails);

  const initialColumns = initializeColumns(['Wishlist', 'Applied', 'Interview', 'Offer', 'No Response']);
  const populatedColumns = populateColumnsWithData(jsonData, initialColumns);
  setColumns(populatedColumns);
}, [jsonData]);



  //===========================Event Handlers===========================//


  const openEditModal = (jobId) => {
    if (jobId === 'new') {
      setNewJobDetails({
        job_title: "",
        description: "",
        company: "",
        location: "",
        salary_range: "",
        is_admin: false,
        post_url: "",
        job_type: "",
        is_partner: false,
        competencies: {"skills": ["skill1", "skill2"]},
        cohort_id: usersCohortId,
        column_id: 1,
        row_num: 1,
        note_id: null,
        interview_status: "",
        tags: null,
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





const handleUpdateJobDetails = async (jobId) => {
  const validateJobDetails = (details) => {
    // Add your validation logic here
    if (!details.job_title.trim()) {
      alert('Please fill out the job title.');
      return false;
    }
    // ... other validations ...
    return true;
  };

  const jobData = jobId === 'new' ? newJobDetails : editJobDetails;

  if (!validateJobDetails(jobData)) {
    return; // Stop if validation fails
  }

  console.log("newjobData:", jobData)
  if (jobId === 'new') {
    try {
      // Construct the body for the API request
      const body = {
        jobDetails: {
          // Add necessary jobStatus fields here
          job_title: jobData.job_title,
          description: jobData.description,
          company: jobData.company,
          location: jobData.location,
          salary_range: jobData.salary_range,
          is_admin: jobData.is_admin,
          post_url: jobData.post_url,
          job_type: jobData.job_type,
          is_partner: jobData.is_partner,
          competencies: jobData.competencies
        },
        jobStatus: {
          cohort_id: jobData.cohort_id,
          column_id: jobData.column_id,
          row_num: jobData.row_num,
          note_id: jobData.note_id,
          interview_status: jobData.interview_status,
          tags: null
        },
        noteContent: {
          noteContent : jobData.note_content
        } // or other note content logic
      };

      console.log("body:", body)
      // Make an API call to create a new job
      const response = await fetch(`https://scouttestserver.onrender.com/api/addjobaddstatus/${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to create the job');
      }

      const newJob = await response.json();
      console.log(newJob)
      setNeedRefresh(true)
      // Update state with the new job data returned from the API
      setJobDetails(prev => ({
        ...prev,
        [newJob.job_id]: newJob
      }));
      setColumns(prev => ({
        ...prev,
        [getColumnTitle(newJob.column_id)]: [...prev[getColumnTitle(newJob.column_id)], newJob]
      }));

    } catch (error) {
      console.error('Error creating new job:', error);
      // Handle error (e.g., show error message to user)
    }
  } else {
    try {
        // Construct the body for the API request
        const body = {
            statusID: jobData.status_id,
            jobID: jobId,
            noteID: jobData.note_id,
            noteContent : jobData.note_content,
            jobStatus: {
              cohort_id: jobData.cohort_id,
              column_id: jobData.column_id,
              row_num: jobData.row_num,
              interview_status: jobData.interview_status,
              tags: null
            },
            jobDetails: {
              job_title: jobData.job_title,
              description: jobData.description,
              company: jobData.company,
              location: jobData.location,
              salary_range: jobData.salary_range,
              is_admin: jobData.is_admin,
              post_url: jobData.post_url,
              job_type: jobData.job_type,
              is_partner: jobData.is_partner,
              competencies: jobData.competencies
            }
        };

        console.log("body:", body)
        // Make an API call to create a new job
        const response = await fetch(`https://scouttestserver.onrender.com/api/updatestatus`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error('Failed to create the job');
        }

        const updatedJob = await response.json();
        console.log(updatedJob)
        setNeedRefresh(true)

      } catch (error) {
        console.error('Error creating new job:', error);
        // Handle error (e.g., show error message to user)
      }
  }

  closeModal();
};




  const handleDeleteJob = (jobId) => {
    // if (jobId && jobId !== 'new') {
    //   // Remove from jobDetails
    //   setJobDetails(prev => {
    //     const newJobDetails = { ...prev };
    //     delete newJobDetails[jobId];
    //     return newJobDetails;
    //   });
  
    //   // Remove from columns
    //   setColumns(prev => {
    //     const newColumns = { ...prev };
    //     Object.keys(newColumns).forEach(columnId => {
    //       newColumns[columnId] = newColumns[columnId].filter(job => job.job_id !== jobId);
    //     });
    //     return newColumns;
    //   });
    // }
    try {
      fetch(`https://scouttestserver.onrender.com/api/job/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // fetch(`https://scouttestserver.onrender.com/api/jobstatus/${editJobDetails.jobStatus}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // fetch(`https://scouttestserver.onrender.com/api/usernotes/${editJobDetails.noteID}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      setNeedRefresh(true);
    } catch (error) {
      console.error('Error deleting job:', error);
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
        <option key={cohort.id} value={cohort.id}>{cohort.name}</option>
      ))}
    </select>
  )



  // JSX for the student selection dropdown (render only for admin)
const studentSelectionDropdown = userType === 'admin' && (
  <select className="select select-bordered mx-4" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
    <option value="">Select Student</option>
    {allStudents.map(student => (
      //console.log(student),
      <option key={student.id} value={student.id}>{student.name}</option>
    ))}
  </select>
);

  const fetchDataForCohort = (selectedCohort) => {
    // Filter the jsonData to return only those jobs that belong to the specified cohort
    return cohortjsonData.filter(job => job.cohort_id === selectedCohort);
  };



  const fetchStudentDataForCohort = (selectedStudent) => {
    console.log("working");
    console.log("selectedCohort:", selectedCohort);
    console.log("cohortjsonData:", cohortjsonData);
    // Filter the jsonData to return only those jobs that belong to the specified cohort
    return cohortjsonData.filter(job => job.cohort_id === selectedCohort && job.user_id === selectedStudent);
  };

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

export default KanbanBoard;