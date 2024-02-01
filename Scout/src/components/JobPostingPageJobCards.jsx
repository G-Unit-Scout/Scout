const JobsComponent = ({ jobs, onJobClick }) => {
    return (
      <div className="flex flex-wrap justify-center">
        {jobs.map((job, index) => (
          <div key={job.job_id} className="card w-96 bg-[#0D0F4A] shadow-xl m-5 cursor-pointer" onClick={() => onJobClick(job)}>
            <div className="card-body">
              <h2 className="card-title">{job.job_title}</h2>
              <p>{job.company}</p>
              {/* Other job details can go here */}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default JobsComponent;
