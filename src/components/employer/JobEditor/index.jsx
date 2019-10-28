import React from "react";
import { Form } from "react-bootstrap";

const JobEditor = (props) => {

  const { handleChangeInput } = props

  const handleChangeTitle = e => {
    e.persist();
    let title = e.target.value;
    handleChangeInput(title);
  };

  const handleChangeTextArea = e => {
    e.persist();
    let body = e.target.value;
    handleChangeInput(body);
  };

  return (
    <div>
      <Form.Row>
        <Form.Group controlId="firstName">
          <Form.Control
            onChange={handleChangeTitle}
            name="title"
            value={props.currTitle}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label />
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChangeTextArea}
          name="body"
          value={props.currBody}
        />
      </Form.Group>
      <div className="button-row">
        <input
          onClick={() => {
            props.saveJob(props.currJob);
          }}
          type="submit"
          value="Save"
        />
        <button onClick={props.cancelJob} type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default JobEditor;
