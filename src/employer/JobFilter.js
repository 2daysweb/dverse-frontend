import React from 'react'
import { connect } from "react-redux";
import { setFilter } from "../actions/index";
import { withRouter } from "react-router-dom";

export default function JobFilter() {
    return (
        <div>
            
        </div>
    )
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
    //Data: String 
    //Return: Booelan 
    
    //Plan:
    //How can it go wrong?
    //Invalid if a open is followed by another open of same type 
    //Invalid of a closed is not preceded bby an open 
    //Invalid if an open is not followed by a close 
    //Invalid if an open of one type is followed by a close fo another type 
    

    //First if it's an opening bracket, push it to the stack 
    //If it's a closing bracket, check if it matches the first element 
    //If it doesn't match the first element return false 
    //If the string is empty, return true 
    
//    let brackets = s.split("")
   
//    const lookup = {'{':'}', '[':']', '(':')'}
   
//    const openBrackets = Object.keys(lookup)
   
//    console.log("Open Brackets", openBrackets)
   
//    const closingBrackets = Object.values(lookup)
   
//    console.log("Closing Brackets", closingBrackets)
   
//    let stack = [] 
   
//     while(brackets.length){  
//         for(let i = 0; i<brackets.length; i++){
//             let currBracket = brackets[i]
//               if(isOpenBracket(openBrackets, currBracket)){  
//                  console.log("Method Worked")
//                  stack.push(currBracket)
//                  brackets.shift()    
//                  break
//                 }                               
//                  if(topOfStack == match){
//                      let match = getMatch(lookup, currBracket)
//                      let topOfStack = stack[-1]  
//                      console.log("match", match, "topOfStack", topOfStack)
//                      stack.pop()
//                      brackets.shift()
//                      break
//                    }
       
//                  else{
//                     return false
//                  }  
//              }
//          } 
    
//        return true  
    
//  }  
       

// let isOpenBracket = (openBrackets, bracket) => {
    
//     if(openBrackets.includes(bracket)){
//         return true
//     }
    
//     return false 
// }

// let getMatch = (lookup, bracket) => {
//     let match = lookup[bracket]
//     return match
// }

