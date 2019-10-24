import React from "react";

const truncateBody = body => {
  if(body){
  let truncatedBody = body.substring(0,6)
  truncatedBody += "...";
  return truncatedBody;
  }
  return "default"
};

const JobItem = props => {
  const { job, set } = props;
  return (
    <li onClick={() => set(job)}>
      <h2> {job.title} </h2>
      <p> {truncateBody(job.body)} </p>
    </li>
  );
};

export default JobItem;
