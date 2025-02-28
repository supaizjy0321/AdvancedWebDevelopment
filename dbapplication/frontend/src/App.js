// frontend/src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Female in STEM Database</h1>
      <Row>
        <Col md={6}>
          <UserForm />
        </Col>
        <Col md={6}>
          <UserList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;