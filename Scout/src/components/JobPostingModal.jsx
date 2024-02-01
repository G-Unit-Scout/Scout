import React from 'react';

const JobModal = ({ userType, isOpen, newJob, jobDetails, onChange, onSave, onClose, onDelete }) => {

    console.log("JobDetails in modal", jobDetails)

    const handleInputChange = (key, value) => {
        // Create a new object with updated key-value pair
        const updatedDetails = { ...jobDetails, [key]: value };
        onChange(updatedDetails); // Pass the updated object to the parent's onChange handler
      };

      // Custom function to display competencies
const displayCompetencies = (competencies) => {
    return competencies && competencies.skills ? competencies.skills.join(', ') : '';
  };

  // Custom function to parse competencies
const parseCompetencies = (competenciesString) => {
    return { skills: competenciesString.split(',').map(skill => skill.trim()) };
  };
      
  if (!isOpen) return null;

  console.log("isOpen", isOpen)

  return (
    <dialog open={isOpen} className="modal overflow-hidden">
      <div className="modal-box bg-[#000814] p-4">
        {/* <div className='flex justify-center space-x-4'>
            {isOpen === 'new' ? (
                <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={onSave}>Save</button>
            ) : (
                <>
                <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={onSave}>Update</button>
                <button className='btn btn-outline btn-error btn-sm mt-4' onClick={() => onDelete(jobDetails.job_id)}>Delete</button>
                </>
            )}
        </div> */}
        {/* Conditional rendering based on userType */}
        {userType === 'admin' ? (
            <div className='flex justify-center space-x-4'>
                {newJob === 'new' ? (
                    <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={onSave}>Save</button>
                ) : (
                    <>
                        {/* <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={onSave}>Update</button> */}
                        <button className='btn btn-outline btn-error btn-sm mt-4' onClick={() => onDelete(jobDetails.job_id)}>Delete</button>
                    </>
                )}
            </div>
        ) : (
            <div className="text-center p-4">
                {/* Display some text or component suitable for students */}
                <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={onSave}>+ Add Job to Personal Board</button>
            </div>
        )}


        <div className="divider text-white">Job Title</div>

        <input 
        type="text" 
        value={jobDetails.job_title || ''} 
        onChange={(e) => handleInputChange('job_title', e.target.value)} 
        className="input input-bordered w-full" 
        required
        />

        <div className="divider text-white">Company</div>

        <input 
            type="text" 
            value={jobDetails.company || ''} 
            onChange={(e) => handleInputChange('company', e.target.value)} 
            className="input input-bordered w-full" 
            required
        />

        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <div className="basis-1/2  divider text-white">Job Type</div>
                <div className="basis-1/2  divider text-white">Salary Range</div>
            </div>
            <div className='flex flex-row'>
            <input 
                type="text" 
                value={jobDetails.job_type || ''}  
                onChange={(e) => handleInputChange('job_type', e.target.value)} 
                className="w-[225px] input input-bordered mr-2" 
                required
            />
            <input 
                type="text" 
                value={jobDetails.salary_range || ''}  
                onChange={(e) => handleInputChange('salary_range', e.target.value)} 
                className="w-[225px] input input-bordered ml-2" 
                required
            />
            </div>
        </div>

        <div className="divider text-white">Location</div>

        <input 
            type="text" 
            value={jobDetails.location || ''}  
            onChange={(e) => handleInputChange('location', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <div className="divider"><a className="link link-primary font-bold">Job URL</a></div>

        <input 
            type="text" 
            value={jobDetails.post_url || ''}  
            onChange={(e) => handleInputChange('post_url', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <div className="divider text-white">Interview Status</div>

        <input 
            type="text" 
            value={jobDetails.interview_status || ''}  
            onChange={(e) => handleInputChange('interview_status', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <div className="divider text-white">Competencies</div>

        <input 
        type="text" 
        value={displayCompetencies(jobDetails.competencies)}  
        onChange={(e) => handleInputChange('competencies', parseCompetencies(e.target.value))} 
        className="input input-bordered w-full" 
        />

        <div className="divider text-white">Job Description</div>

        <textarea 
            className="textarea textarea-bordered w-full" 
            value={jobDetails.description || ''}  
            onChange={(e) => handleInputChange('description', e.target.value)}
        ></textarea>

        <div className="divider text-white">Student/Admin Notes</div>

        <textarea 
            className="textarea textarea-bordered w-full" 
            value={jobDetails.note_content || ''}  
            onChange={(e) => handleInputChange('note_content', e.target.value)}
        ></textarea>

      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default JobModal;





