import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

export default function Applications() {
  const { SearchBar } = Search;
  const products=[{id:1, firstName:"John", lastName:"Doe", coverLetter:"jdoe_cover.pdf",  resume:"jdoe_resume.pdf", status:"not replied"}, 
  {id:2, firstName:"Alice", lastName:"Walker", coverLetter:"awalk_cover.pdf",  resume:"awa_resume.pdf", status:"replied"},]
  const columns = [
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
  return (
    <div>
      <ToolkitProvider keyField="id" data={products} columns={columns} search>
        {props => (
          <div>
            <h3>Search Applications:</h3>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
}




