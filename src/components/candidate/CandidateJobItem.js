import React from "react";

const truncateJob = JobTitle => {
  const JobWordsArray = JobTitle.split(" ");
  let firstThreeWords = JobWordsArray.splice(0, 3);
  let threeWords = firstThreeWords.join();
  var caption = threeWords.replace(/,/g, " ");
  caption += "...";
  return caption;
};
const JobItem = props => {
  return (
    <div>
      <li onClick={() => props.showJob(props.currJob)}>
        <h2>{props.currJob.title}</h2>
        <p>{truncateJob(props.currJob.title)}</p>
      </li>
    </div>
  );
};

export default JobItem;
