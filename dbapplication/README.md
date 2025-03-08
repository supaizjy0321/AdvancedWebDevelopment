# Female in STEM Database Application

A full-stack web application for showcasing profiles of notable women in STEM fields, including their achievements and hobbies.

## Project Structure

This project consists of two main parts:

- **Backend**: A Node.js/Express server with SQLite database
- **Frontend**: A React application with Bootstrap for styling

## Features

- View a list of women in STEM
- Add new profiles with name, hobby, and achievement information
- Delete profiles from the database
- Responsive design that works on desktop and mobile

## Technologies Used

- **Frontend**:
  - React
  - React Bootstrap
  - CSS
  
- **Backend**:
  - Node.js
  - Express
  - SQLite3
  - CORS

## Setup and Installation

### Running the Backend

```bash
cd backend
npm install
node server.js
```

The backend server will run on http://localhost:3000

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend development server will run on http://localhost:3001

## Testing

This project includes three types of tests:

### 1. Unit Tests

Tests for individual React components using Jest and React Testing Library.

```bash
cd frontend
npm run test:unit
```

### 2. End-to-End Tests

Tests for full user flows using Playwright.

```bash
cd frontend
npm run test:e2e
```

To view the detailed HTML report after running the tests:

```bash
npx playwright show-report
```

### 3. Load Tests

Performance tests for the API endpoints using k6.

```bash
cd frontend
k6 run tests/load.test.js
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /users` - Get all user profiles
- `POST /users` - Create a new user profile
- `PUT /users/:id` - Update a user profile
- `DELETE /users/:id` - Delete a user profile

## Authors

- Your Name

## License

This project is licensed under the MIT License.