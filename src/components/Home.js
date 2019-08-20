import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Your Employer Home Page!</h1>
        </Container>
        <ul>
          <li>Learn how to add a job posting</li>
          <li>Learn how to delete a job posting</li>
          <li>Learn how to filter through our candidates database</li>
        </ul>
      </Jumbotron>
    </div>
  );
}

