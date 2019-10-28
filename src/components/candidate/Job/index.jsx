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
  return (
    <div>
      <li onClick={() => props.showJob(props.currJob)}>
        <h2>{props.currJob.title}</h2>
        <p>{truncateBody(props.currJob.body)}</p>
      </li>
    </div>
  );
};

export default Job;
