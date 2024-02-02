const JobsComponent = ({ jobs, onJobClick }) => {


  const sortedJobs = [...jobs].sort((a, b) => b.job_id - a.job_id);



    return (
      <div className="flex flex-wrap justify-center">
        {sortedJobs.map((job) => (
          <div key={job.job_id} className="card w-96 bg-[#0D0F4A] shadow-xl m-5 cursor-pointer text-white" onClick={() => onJobClick(job)}>
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
