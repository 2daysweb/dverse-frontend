import React from "react";

const truncateJob = JobTitle => {
  const JobWordsArray = JobTitle.split(" ");
  const firstThreeWords = JobWordsArray.splice(0, 3);
  const threeWords = firstThreeWords.join();
  let caption = threeWords.replace(/,/g, " ");
  caption += "...";
  return caption;
};

const JobItem = props => {
  const { job, set } = props;
  return (
    <li onClick={() => set(job)}>
      <h2> {job.title} </h2>
      <p> {truncateJob(job.body)} </p>
    </li>
  );
};

export default JobItem;
