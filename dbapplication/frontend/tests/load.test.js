// tests/load.test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration for the load test
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 virtual users
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  },
};

// Main function that each virtual user will execute
export default function () {
  // Test getting the list of users
  const getUsersResponse = http.get('http://localhost:3000/users');
  
  // Verify the response code and response time
  check(getUsersResponse, {
    'get users status is 200': (r) => r.status === 200,
    'get users response time < 200ms': (r) => r.timings.duration < 200,
  });
  
  // Create a new user with random data to avoid duplicate entries
  const randomId = Math.floor(Math.random() * 10000);
  const payload = JSON.stringify({
    femaleinstem: `Load Test User ${randomId}`,
    hobby: 'Performance Testing',
    achievement: `Generated ${randomId} requests`
  });
  
  // Test creating a new user
  const createUserResponse = http.post(
    'http://localhost:3000/users',
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  
  // Verify the response code and response time for creation
  check(createUserResponse, {
    'create user status is 200': (r) => r.status === 200,
    'create user response time < 300ms': (r) => r.timings.duration < 300,
  });
  
  // Delete the user we just created (if possible)
  // We need to extract the ID from the response
  if (createUserResponse.status === 200) {
    const userId = JSON.parse(createUserResponse.body).id;
    
    // Test deleting a user
    const deleteUserResponse = http.del(`http://localhost:3000/users/${userId}`);
    
    // Verify the response code and response time for deletion
    check(deleteUserResponse, {
      'delete user status is 200': (r) => r.status === 200,
      'delete user response time < 300ms': (r) => r.timings.duration < 300,
    });
  }
  
  // Add some sleep time between iterations to simulate realistic user behavior
  sleep(1);
}