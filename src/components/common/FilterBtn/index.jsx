import React from 'react';
const FilterBtn = props => {
    const {filter, name, setFilter} = props
  return (
    <button  onClick={() => setFilter(filter)}>{name}</button>
  );
};

export default FilterBtn;
