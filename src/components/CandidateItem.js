import React from "react";

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

//Component populates sidebar with job posting or candidate informatiion

const CandidateItem = props => {
  return (
    <div>
      <li onClick={() => props.showJob(props.currJob)}>
        <h2>{props.currJob.user.email}</h2>
        <p>{truncateJob(props.currJob.user.bio)}</p>
      </li>
    </div>
  );
};

export default CandidateItem;
