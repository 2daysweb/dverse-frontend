import React from "react";

const Search = props => {
  //Conditionally render Jobs or Candidates placeholder
  let renderSearchPlaceholder = () => {
    let placeholder = "Search Jobs";
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

const withPlaceholderText = Search => {
    let placeholderText = 'Search candidates'

  class EnhancedSearch extends React.Component {
    render() {
      return <Search placeholder={placeholderText} />;
    }
  }
  return EnhancedSearch;
};

export default withPlaceholderText(Search)
