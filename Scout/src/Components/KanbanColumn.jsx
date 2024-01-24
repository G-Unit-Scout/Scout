import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ columnId, columnData, openEditModal }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div className='rounded-lg border-[1px] min-w-80' {...provided.droppableProps} ref={provided.innerRef}>
          <div className='border-b-2 p-2'>
            <div className='flex flex-row justify-center'>
              <h2 className='flex justify-center stat-value m-2'>{columnId}:</h2>
              <div className="flex justify-center stat-value m-2">{columnData.length}</div>
            </div>
            {/* <h2 className='flex justify-center stat-value m-2'>{columnId}</h2>
            <div className="flex justify-center stat-value m-2">{columnData.length}</div> */}
            <button className='btn btn-outline btn-sm w-full text-lg' onClick={() => openEditModal('new', columnId)}>+</button>
          </div>
          {columnData.map((job, index) => (
            <KanbanCard key={job.job_id} job={job} index={index} openEditModal={openEditModal} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
