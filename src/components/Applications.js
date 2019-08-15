import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

export default function Applications(props) {
  const { SearchBar } = Search;

  const columnsCandidate = [
    {
      dataField: "id",
      text: "Candidate ID"
    },
    {
      dataField: "firstName",
      text: "First Name"
    },
    {
      dataField: "lastName",
      text: "Last Name"
    },
    {
      dataField: "coverLetter",
      text: "Cover Letter"
    },
    {
      dataField: "resume",
      text: "Resume"
    },
    {
      dataField: "status",
      text: "Status"
    },
    {
      dataField: "dateApplied",
      text: "Date Recieved"
    },
    {
      dataField: "dateProcessed",
      text: "Date Processed"
    }
  ];

  const renderCandidatesOrApplication = () => {
    if (props.currUser) {
      let user_type = props.currUser.user_type;
      switch (user_type) {
        case "employer":
          return (
            <ToolkitProvider
              keyField="id"
              data={candidates}
              columns={columnsCandidate}
              Search
            >
              {props => (
                <div>
                  <h3>Search Applications:</h3>
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable {...props.baseProps} />
                </div>
              )}
            </ToolkitProvider>
          );
        case "candidate":
          return (
            <ToolkitProvider
              keyField="id"
              data={candidates}
              columns={columnsCandidate}
              Search
            >
              {props => (
                <div>
                  <h3>My Applications:</h3>
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable {...props.baseProps} />
                </div>
              )}
            </ToolkitProvider>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const candidates = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      coverLetter: "jdoe_cover.pdf",
      resume: "jdoe_resume.pdf",
      status: "not replied"
    },
    {
      id: 2,
      firstName: "Alice",
      lastName: "Walker",
      coverLetter: "awalk_cover.pdf",
      resume: "awa_resume.pdf",
      status: "replied"
    }
  ];

  return <div>{renderCandidatesOrApplication()}</div>;
}

/* {props.currUser.user_type==="employer" ? (
      <ToolkitProvider keyField="id" data={candidates} columns={columnsCandidate} Search>
      {props => (
        <div>
          <h3>Search Applications:</h3>
          <SearchBar {...props.searchProps} />
          <hr />
          <BootstrapTable {...props.baseProps} />
        </div>
      )}
    </ToolkitProvider>
       ) : (
        <ToolkitProvider keyField="id" data={candidates} columns={columnsCandidate} Search>
        {props => (
          <div>
            <h3>My Applications:</h3>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
       ) 
      
      } */

{
  /* {props.currUser.user_type==="employer" ? (
      <ToolkitProvider keyField="id" data={candidates} columns={columnsCandidate} Search>
      {props => (
        <div>
          <h3>Search Applications:</h3>
          <SearchBar {...props.searchProps} />
          <hr />
          <BootstrapTable {...props.baseProps} />
        </div>
      )}
    </ToolkitProvider>
       ) : (
        <ToolkitProvider keyField="id" data={candidates} columns={columnsCandidate} Search>
        {props => (
          <div>
            <h3>My Applications:</h3>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
       ) 
      
      } */
}
