import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
class AdminJobEditor extends Component {
  handleChangeTitle = e => {
    e.persist();
    let newTitle = e.target.value;
    this.props.handleChangeInput(newTitle);
  };

  handleChangeTextArea = e => {
    e.persist();
    let newBody = e.target.value;
    this.props.handleChangeTextArea(newBody);
  };


  render() {
    return (
      <div>
        <Form.Row>
          <Form.Group controlId="firstName">

            <Form.Control onChange={this.handleChangeTitle} name="title" value={this.props.currTitle} />
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
          <button  onClick={this.props.cancelJob} type="button">
            Cancel
          </button>
          <button  onClick={()=> this.props.disapproveJob(this.props.currJob)} type="button">
            Disapprove
          </button>
        </div>
    
      </div>

  
    );
  }
}

export default AdminJobEditor;
