import React from "react";
import Job from "../Job";

const JobList = props => {
  const { jobs, setSelected } = props;
  return (
    <ul>
      {jobs.length? (jobs.map(job => 
        <Job key={job.id} job={job} setSelected={setSelected} />)):(null)
        }
    </ul>
  );
};

export default JobList;
