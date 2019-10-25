import React from "react";
import Item from '../common/Item.js'

const JobItem = props => {
  const {job, set} = props
  return (
    <div>
      <Item item={job} set={set}/>
    </div>
  )
}

export default JobItem;



