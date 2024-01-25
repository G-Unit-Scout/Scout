import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const KanbanCard = ({ job, index, openEditModal }) => {
  return (
    <Draggable key={job.job_id} draggableId={String(job.job_id)} index={index}>
      {(provided) => (
        <div 
          className='card w-80 bg-[#0D0F4A] m-4 shadow-xl'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => openEditModal(job.job_id)}
        >
          <div className="card-body">
            <p className='text-xs'>{job.user_name}</p>
            <h2 className="card-title">{job.job_title}</h2>
            <p className='text-sm'>{job.company || ''}</p>
            <p className={`badge badge-outline ${
                job.location?.toLowerCase() === 'remote' 
                    ? 'badge-accent' 
                    : job.location?.toLowerCase().includes('hybrid') 
                    ? 'badge-secondary' 
                    : 'badge-primary'
                }`}>
                {job.location || ''}
            </p>

            {job.interview_status !== null && job.interview_status !== "null" && job.interview_status !== "" && (
                <p className="badge badge-outline">{job.interview_status || ''}</p>
            )}
            {/* Other details */}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
