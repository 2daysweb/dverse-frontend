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

const JobItem = props => {


  return (    <div>
    <li onClick={() => props.showJob(props.currJob)}>
      <h2>{props.currJob.title}</h2>
      <p>{truncateJob(props.currJob.body)}</p>
    </li>
  </div>)
};

export default JobItem;

// <li onClick={() => props.showJob(props.currJob)}>
// <h2>{props.currJob.title}</h2>
// <p>{truncateJob(props.currJob.body)}</p>
// </li>

// //Render candidate or job item based on user type 
// const renderCandidateOrJobPosting = () => {
//   let currUser = props.currUser
//     debugger;
//   if(currUser){
//     let userType = currUser.user_type
//     switch (userType) {
//       case "employer":
//         return (
//           <div>
//             <li onClick={() => props.showJob(props.currJob)}>
//               <h2>{props.currJob.title}</h2>
//               <p>{truncateJob(props.currJob.body)}</p>
//             </li>
//           </div>
//         );

//       case "candidate":
//         return (
//           <div>
//             <li onClick={() => props.showJob(props.currJob.user.email)}>
//               <h2>{props.currJob.title}</h2>
//               <p>{truncateJob(props.currJob.user.bio)}</p>
//             </li>
//           </div>
//         );

//       case "admin":
//         return (
//           <div>
//             <li onClick={() => props.showJob(props.currJob.user.email)}>
//               <h2>{props.currJob.title}</h2>
//               <p>{truncateJob(props.currJob.user.bio)}</p>
//             </li>
//           </div>
//         );
//       default:
//         return false;
//     }
//   }
//   else {
//     return null 
//   }

// };
