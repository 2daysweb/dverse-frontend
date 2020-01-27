import React from "react";

const Job = ({ job, setSelected }) => {
  const truncateBody = body => {
    if (body) {
      let truncated = body.substring(0, 6);
      truncated += "...";
      return truncated;
    }
    return "default";
  };
  return (
    <li onClick={() => setSelected(job)}>
      <h2> {job.title} </h2>
      <p> {truncateBody(job.body)} </p>
      <p>Status: {job.status}</p>
    </li>
  );
};

export default Job;
