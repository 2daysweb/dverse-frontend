import React from "react";
import FilterBtn from "../FilterBtn";
import styles from './styles.css'
import { VisibilityFilters } from "../../../actions";


const FilterBar = ({setFilter}) => {
  return (
    <div className={'filter-bar-container'} >
      <FilterBtn
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_ALL}
        name={"All"}
      />
      <FilterBtn
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_DRAFTED}
        name={"Approved"}
      />
      <FilterBtn
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_SUBMITTED}
        name={"Submitted"}
      />
      <FilterBtn
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_DRAFTED}
        name={"Drafted"}
      />
    </div>
  );
};

export default FilterBar;
