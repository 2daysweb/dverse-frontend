import React from "react";
import FilterLink from "../FilterLink";
import { VisibilityFilters } from "../../../actions";

const Footer = props => {
  const { setFilter } = props;

  return (
    <div>
      <FilterLink
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_ALL}
        name={"All"}
      />
      <FilterLink
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_DRAFTED}
        name={"Approved"}
      />
      <FilterLink
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_SUBMITTED}
        name={"Submitted"}
      />
      <FilterLink
        setFilter={setFilter}
        filter={VisibilityFilters.SHOW_DRAFTED}
        name={"Drafted"}
      />
    </div>
  );
};

export default Footer;
