import React from "react";
import { connect } from "react-redux";

const truncateJob = JobTitle => {
  const JobWordsArray = JobTitle.split(" ");
  const firstThreeWords = JobWordsArray.splice(0, 3);
  const threeWords = firstThreeWords.join();
  let caption = threeWords.replace(/,/g, " ");
  caption += "...";
  return caption;
};

const JobItem = props => {
  const { job, setJob } = props;
  return (
    <li onClick={() => setJob(job)}>
      <h2> {job.title} </h2>
      <p> {truncateJob(job.body)} </p>
    </li>
  );
};

const mapStateToProps = state => {
  return {
    selectedJob: state.selectedJob
  };
};

export default connect(mapStateToProps)(JobItem);
