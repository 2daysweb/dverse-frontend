import React from "react";

var classNames = require("classnames");

//Get the first 3 words of a Job
const truncateJob = JobTitle => {
  let JobWordsArray = JobTitle.split(" ");
  //take first 3 words of array
  let firstThreeWords = JobWordsArray.splice(0, 3);

  //create string of first 3 words
  let threeWords = firstThreeWords.join();

  //set caption after removing commas, adding space b/w words
  var caption = threeWords.replace(/,/g, " ");

  caption += "...";

  return caption;
};

const setBackgroundColor = job => {
  switch (job.status) {
    case "draft":
      return "pink";
    case "approved":
      return "green";
    case "submitted":
      return "yellow";
  }
};

const JobItem = props => {
  return (
    <li
      style={{
        backgroundColor: setBackgroundColor(props.currJob)
      }}
      onClick={() => props.showJob(props.currJob)}
    >
      <h2>{props.currJob.title}</h2>
      <p>{truncateJob(props.currJob.body)}</p>
    </li>
  );
};

export default JobItem;
