import React from "react";

const Job = props => {
  const truncateBody = body => {
    if (body) {
      let truncated = body.substring(0, 6);
      truncated += "...";
      return truncated;
    }
    return "default";
  };

  const { job, setSelected } = props;
  return (
    <li onClick={() => setSelected(job)}>
      <h2> {job.title} </h2>
      <p> {truncateBody(job.body)} </p>
    </li>
  );
};

export default Job;
