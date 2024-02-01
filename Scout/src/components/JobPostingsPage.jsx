import { useState, useEffect } from 'react';
import JobsComponent from './JobPostingPageJobCards';
import JobPostingModal from './JobPostingModal';

function JobPostingsPage({userType, user_id, usersCohortId}) {


    const [jobBoardJobs, setJobBoardJobs] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editJobBoardDetails, setEditJobBoardDetails] = useState({});
    const [newJobBoardDetails, setNewJobBoardDetails] = useState({});
    const [modalMode, setModalMode] = useState('edit'); // 'edit' or 'new'
    const [refresh, setRefresh] = useState(0);




    // Fetching student kanban data when userType is student
    useEffect(() => {
        
        const fetchStudentData = async () => {
            setIsLoading(true); // Start loading
            try {
            const response = await fetch(`https://scouttestserver.onrender.com/api/jobs`);
            const data = await response.json();
            setJobBoardJobs(data);
            //console.log("data In fetch Partner_Jobs:", data)
            } catch (error) {
            console.error('Error fetching student data:', error);
            } finally {
                setIsLoading(false); // Stop loading regardless of success or error
            }
        };
    
        fetchStudentData();
    }, [refresh]);



    const closeModal = () => {
        console.log("===close modal===")
        setSelectedJob(null);
        setModalMode('edit');
        setIsModalOpen(false);
    };



    // JobPostingsPage.jsx
    const handleJobClick = (job) => {
        setSelectedJob(job);
        setModalMode('edit');
        setIsModalOpen(true);
    };


    const handleAddNewJob = () => {
        setSelectedJob(null);
        setModalMode('new');
        setIsModalOpen(true);
        setNewJobBoardDetails({})
    };


    const handleJobDetailsChange = (updatedDetails) => {
        if (modalMode === 'new') {
          setNewJobBoardDetails(updatedDetails);
        } else {
          setEditJobBoardDetails(updatedDetails);
        }
        console.log("Edit Job Details:", editJobBoardDetails)
    };


    //console.log("Selected Job:", selectedJob)

    const handleSaveNewJob = async () => {
        // API endpoint for creating or updating jobs
        let apiEndpoint;
        let method;
        let bodyData;


    
        if (modalMode === 'new') {
            let newJobObj = {
                jobDetails: {
                    job_title: newJobBoardDetails.job_title,
                    description: newJobBoardDetails.description,
                    company: newJobBoardDetails.company,
                    location: newJobBoardDetails.location,
                    salary_range: newJobBoardDetails.salary_range,
                    is_admin: true,
                    post_url: newJobBoardDetails.post_url,
                    job_type: newJobBoardDetails.job_type,
                    is_partner: true,
                    competencies: newJobBoardDetails.competencies,
                }
            }
            // Set the API endpoint and HTTP method for creating a new job
            apiEndpoint = 'https://scouttestserver.onrender.com/api/addjob'; // Adjust with your actual endpoint
            method = 'PUT';
            bodyData = newJobObj;
        } else if (userType === 'admin') {
            let updatedJobObj = {
                jobDetails: {
                  // Add necessary jobStatus fields here
                  job_title: selectedJob.job_title,
                  description: selectedJob.description,
                  company: selectedJob.company,
                  location: selectedJob.location,
                  salary_range: selectedJob.salary_range,
                  is_admin: false,
                  post_url: selectedJob.post_url,
                  job_type: selectedJob.job_type,
                  is_partner: false,
                  competencies: selectedJob.competencies
                },
                jobStatus: {
                  cohort_id: usersCohortId,
                  column_id: 1,
                  row_num: 1,
                  note_id: null,
                  interview_status: "",
                  tags: null
                },
                noteContent: {
                  noteContent : ""
                } // or other note content logic
              };
            // Set the API endpoint and HTTP method for updating an existing job
            apiEndpoint = `https://scouttestserver.onrender.com/api/addjobaddstatus/${user_id}`; // Adjust with your actual endpoint
            method = 'PUT';
            bodyData = updatedJobObj;
            //console.log("UpdatedJobObj:", updatedJobObj)
        } else {
            let updatedJobObj = {
                jobDetails: {
                  // Add necessary jobStatus fields here
                  job_title: selectedJob.job_title,
                  description: selectedJob.description,
                  company: selectedJob.company,
                  location: selectedJob.location,
                  salary_range: selectedJob.salary_range,
                  is_admin: false,
                  post_url: selectedJob.post_url,
                  job_type: selectedJob.job_type,
                  is_partner: false,
                  competencies: selectedJob.competencies
                },
                jobStatus: {
                  cohort_id: usersCohortId,
                  column_id: 1,
                  row_num: 1,
                  note_id: null,
                  interview_status: "",
                  tags: null
                },
                noteContent: {
                  noteContent : ""
                } // or other note content logic
              };
            // Set the API endpoint and HTTP method for updating an existing job
            apiEndpoint = `https://scouttestserver.onrender.com/api/addjobaddstatus/${user_id}`; // Adjust with your actual endpoint
            method = 'PUT';
            bodyData = updatedJobObj;
            //console.log("UpdatedJobObj:", updatedJobObj)
        }
    
        try {
            const response = await fetch(apiEndpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok', response);
            }
    
            // Handle the response here (e.g., update state, close modal, etc.)
            const data = await response.json();
            setRefresh(refresh + 1);
            console.log("success:", data);
            setIsModalOpen(false); // Close the modal
    
            // Add additional logic here to refresh the job list or update the UI as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };






    const handleDeleteJob = async (jobId) => {
        let apiEndpoint  = `https://scouttestserver.onrender.com/api/job/${jobId}`;
        let method = 'DELETE';

        
        try {
            const response = await fetch(apiEndpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Handle the response here (e.g., update state, close modal, etc.)
            const data = await response.json();
            setRefresh(refresh + 1);
            console.log("success:", data);
            setIsModalOpen(false); // Close the modal
    
            // Add additional logic here to refresh the job list or update the UI as needed
        } catch (error) {
            console.error('Error:', error);
        }
        
    }
    
    




    const addNewJobButton = userType === 'admin' && (
        <div className="flex justify-center">
            <button className='btn btn-outline btn-sm w-40 text-lg' onClick={handleAddNewJob}>Add New Job +</button>
        </div>
    )
    // console.log("newJobBoardDetails", newJobBoardDetails)
    // console.log("selectedJob", selectedJob)
    // console.log("editJobBoardDetails", editJobBoardDetails)
    // console.log("isModalOpen", isModalOpen)


    return (
    <>
    <div className="h-screen">
        <div className="flex justify-center">
            <h1 className="text-2xl font-bold m-4">Partnered Job Postings Board</h1>
        </div>
        <div>
            {addNewJobButton}
        </div>
        <div className="divider"></div>
        {isLoading ? (
            <div>Loading...</div> // Replace with a loading spinner or skeleton component
        ) : (
            <JobsComponent jobs={jobBoardJobs} onJobClick={handleJobClick} />
        )}
        {isModalOpen && (
        <JobPostingModal 
            userType={userType}
            isOpen={isModalOpen} 
            newJob={modalMode}
            jobDetails={modalMode === 'new' ? newJobBoardDetails : selectedJob || editJobBoardDetails} 
            onChange={handleJobDetailsChange} 
            onSave={handleSaveNewJob}
            onClose={closeModal}
            //onDelete={handleDeleteJob}
            onDelete={handleDeleteJob}
        />
    )}
    </div>
    </>
);

}

export default JobPostingsPage