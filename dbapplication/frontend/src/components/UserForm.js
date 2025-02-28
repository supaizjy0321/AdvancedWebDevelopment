// frontend/src/components/UserForm.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function UserForm() {
  const [user, setUser] = useState({
    femaleinstem: '',
    hobby: '',
    achievement: ''
  });
  
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      alert('User added successfully!');
      // Reset form
      setUser({
        femaleinstem: '',
        hobby: '',
        achievement: ''
      });
      // Trigger a refresh of the user list
      window.dispatchEvent(new Event('userAdded'));
    })
    .catch(error => {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    });
  };
  
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Add New STEM Profile</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Female in STEM</Form.Label>
            <Form.Control 
              type="text" 
              name="femaleinstem" 
              value={user.femaleinstem} 
              onChange={handleChange} 
              placeholder="Enter name" 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Hobby</Form.Label>
            <Form.Control 
              type="text" 
              name="hobby" 
              value={user.hobby} 
              onChange={handleChange} 
              placeholder="Enter hobby" 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Achievement</Form.Label>
            <Form.Control 
              type="text" 
              name="achievement" 
              value={user.achievement} 
              onChange={handleChange} 
              placeholder="Enter achievement" 
              required 
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Add Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserForm;