import React from 'react';
import {Link} from 'react-router-dom'
const FilterLink = props => {
    const {filter, name, setFilter} = props
  return (
      <Link onClick={() => setFilter(filter)}>{name}</Link>
  );
};

export default FilterLink;
