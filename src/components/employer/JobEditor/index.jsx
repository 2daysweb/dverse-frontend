import React, { useState } from "react";
import { Form } from "react-bootstrap";

const JobEditor = ({ job, cancel, save, user }) => {
  const [title, setTitle] = useState(job.title);
  const [body, setBody] = useState(job.body);
  const handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    name === "title" ? setTitle(value) : setBody(value);
  };
  return (
    <Form onSubmit={() => save(job, title, body, user)}>
      <Form.Row>
        <Form.Group controlId="title">
          <Form.Control onChange={handleChange} name="title" value={title} />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="body">
        <Form.Label />
        <Form.Control
          as="textarea"
          rows="3"
          onChange={handleChange}
          name="body"
          value={body}
        />
      </Form.Group>
      <div className="button-row">
        <input type="submit" value="Save" />
        <button onClick={cancel} type="button">
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default JobEditor;
