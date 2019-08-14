import React, { Component } from "react";

class JobEditor extends Component {
  handleChangeTitle = e => {
    e.persist();
    let newTitle = e.target.value;
    this.props.handleChangeInput(newTitle);
  };

  handleChangeTextArea = e => {
    e.persist();
    let newBody = e.target.value;
    this.props.handleChangeTextArea(newBody);
    // console.log(newBody)
  };

  render() {
    return (
      <form className="Job-editor">
        <input
          type="text"
          onChange={this.handleChangeTitle}
          name="title"
          value={this.props.currTitle}
        />
        <textarea
          onChange={this.handleChangeTextArea}
          name="body"
          value={this.props.currBody}
        />
        <div className="button-row">
          <input
            className="button"
            onClick={() => {
              this.props.saveJob(this.props.currJob);
            }}
            type="submit"
            value="Save"
          />
          <button onClick={this.props.cancelJob} type="button">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default JobEditor;
