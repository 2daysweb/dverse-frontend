import React from "react";

var classNames = require('classnames');


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

let itemClass = 'background-color: blue';
classNames({ 'background-color:blue': true });

let setLiBackgroundColor = (status) => {

  switch(status){
    case 'draft':
    return 'pink'
    case 'submitted':
    return 'yellow'
    case 'approved':
    return '#92a8d1'
    default:
      return ''
  }
}
 

//Component populates sidebar with job posting or candidate informatiion


const JobItem = props => {
  return (
   
      <li style={{backgroundColor:'#92a8d1'}} onClick={() => props.showJob(props.currJob)}>
        <h2>{props.currJob.title}</h2>
        <p>{truncateJob(props.currJob.body)}</p>
      </li>
   
  );
};

export default JobItem;
