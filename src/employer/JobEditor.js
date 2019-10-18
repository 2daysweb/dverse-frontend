import React, { Component } from "react";
import { Form } from "react-bootstrap";

class JobEditor extends Component {
  handleChangeTitle = e => {
    const { handleChangeInput } = this.props;
    e.persist();
    let newTitle = e.target.value;
    handleChangeInput(newTitle);
  };

  handleChangeTextArea = e => {
    const { handleChangeTextArea } = this.props;
    e.persist();
    let newBody = e.target.value;
    handleChangeTextArea(newBody);
  };

  render() {
    return (
      <div>
        <Form.Row>
          <Form.Group controlId="firstName">
            <Form.Control
              onChange={this.handleChangeTitle}
              name="title"
              value={this.props.currTitle}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label />
          <Form.Control
            as="textarea"
            rows="3"
            onChange={this.handleChangeTextArea}
            name="body"
            value={this.props.currBody}
          />
        </Form.Group>
        <div className="button-row">
          <input
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
      </div>
    );
  }
}

export default JobEditor;
