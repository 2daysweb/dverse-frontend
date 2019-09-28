import React from "react";

const Search = props => {
  let renderSearchPlaceholder = () => {
    let placeholder = "Search";
  };

  return (
    <div className="filter">
      <input
        onChange={e => props.handleChangeSearchText(e)}
        id="search-bar"
        type="text"
      />
    </div>
  );
};

export default Search;
