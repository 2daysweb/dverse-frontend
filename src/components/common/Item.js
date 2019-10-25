import React from 'react'

const truncateBody = body => {
    if(body){
    let truncated = body.substring(0,6)
    truncated += "...";
    return truncated;
    }
    return "default"
  };

const Item = (props) => {
    
    const { item, set } = props
        return (
          <li onClick={() => set(item)}>
            <h2> {item.title} </h2>
            <p> {truncateBody(item.body)} </p>
          </li>
    )
}

export default Item
