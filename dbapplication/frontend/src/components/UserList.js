// frontend/src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { Table, Card, Button } from 'react-bootstrap';

function UserList() {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = () => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  
  useEffect(() => {
    fetchUsers();
    
    // Listen for user added event to refresh the list
    const handleUserAdded = () => fetchUsers();
    window.addEventListener('userAdded', handleUserAdded);
    
    return () => {
      window.removeEventListener('userAdded', handleUserAdded);
    };
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          alert('Profile deleted successfully!');
          fetchUsers(); // Refresh the list
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          alert('Failed to delete profile');
        });
    }
  };
  
  return (
    <Card>
      <Card.Header as="h5">STEM Profiles</Card.Header>
      <Card.Body>
        {users.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Female in STEM</th>
                <th>Hobby</th>
                <th>Achievement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.femaleinstem}</td>
                  <td>{user.hobby}</td>
                  <td>{user.achievement}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No profiles found. Add some profiles to get started!</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserList;