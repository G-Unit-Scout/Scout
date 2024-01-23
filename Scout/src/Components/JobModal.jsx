import React from 'react';

const JobModal = ({ isOpen, jobDetails, onChange, onSave, onClose }) => {

    const handleInputChange = (key, value) => {
        // Create a new object with updated key-value pair
        const updatedDetails = { ...jobDetails, [key]: value };
        onChange(updatedDetails); // Pass the updated object to the parent's onChange handler
      };
      
  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box bg-[#000814]">
        <h3 className="font-bold text-lg">Job Title:</h3>
        <input type="text" value={jobDetails.job_title || ''} onChange={(e) => handleInputChange('job_title', e.target.value)} className="input input-bordered w-full" />
        {/* Other inputs */}






        <div className="divider"></div>

        <p className="font-bold">Company:</p>
        <input 
            type="text" 
            value={jobDetails.company || ''} 
            onChange={(e) => handleInputChange('company', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <div className='flex flex-col'>
            <div className='flex flex-row'>
            <p className="basis-1/2 font-bold">Job Type:</p>
            <p className="basis-1/2 font-bold ml-4">Salary Range:</p>
            </div>
            <div className='flex flex-row'>
            <input 
                type="text" 
                value={jobDetails.job_type || ''}  
                onChange={(e) => handleInputChange('job_type', e.target.value)} 
                className="basis-1/2 input input-bordered mr-2" 
            />
            <input 
                type="text" 
                value={jobDetails.salary_range || ''}  
                onChange={(e) => handleInputChange('salary_range', e.target.value)} 
                className="basis-1/2 input input-bordered ml-2" 
            />
            </div>
        </div>

        <p className="font-bold">Location:</p>
        <input 
            type="text" 
            value={jobDetails.location || ''}  
            onChange={(e) => handleInputChange('location', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <div className="divider"></div>

        <p className="font-bold">Job URL: <a className="link link-primary">TEST</a></p>
        <input 
            type="text" 
            value={jobDetails.post_url || ''}  
            onChange={(e) => handleInputChange('post_url', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <p className="font-bold">Interview Status:</p>
        <input 
            type="text" 
            value={jobDetails.interview_status || ''}  
            onChange={(e) => handleInputChange('interview_status', e.target.value)} 
            className="input input-bordered w-full" 
        />

        <div className="divider"></div>

        <p className="font-bold">Description:</p>
        <textarea 
            className="textarea textarea-bordered w-full" 
            value={jobDetails.description || ''}  
            onChange={(e) => handleInputChange('description', e.target.value)}
        ></textarea>

        <p className="font-bold">Notes:</p>
        <textarea 
            className="textarea textarea-bordered w-full" 
            value={jobDetails.note_content || ''}  
            onChange={(e) => handleInputChange('note_content', e.target.value)}
        ></textarea>





        
        <div className='flex justify-center'>
          <button className='btn btn-outline btn-accent btn-sm mt-4' onClick={onSave}>Save</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default JobModal;
