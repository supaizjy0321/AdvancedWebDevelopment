// src/tests/UserForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from '../components/UserForm';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1 }),
  })
);

// Mock window.alert
window.alert = jest.fn();

// Mock the window.dispatchEvent
window.dispatchEvent = jest.fn();

describe('UserForm Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    window.alert.mockClear();
    window.dispatchEvent.mockClear();
  });

  test('renders form elements correctly', () => {
    render(<UserForm />);
    
    // Check if form elements are rendered
    expect(screen.getByText('Female in STEM')).toBeInTheDocument();
    expect(screen.getByText('Hobby')).toBeInTheDocument();
    expect(screen.getByText('Achievement')).toBeInTheDocument();
    expect(screen.getByText('Add Profile')).toBeInTheDocument();
  });

  test('form inputs update correctly', () => {
    render(<UserForm />);
    
    // Get form inputs
    const nameInput = screen.getByPlaceholderText('Enter name');
    const hobbyInput = screen.getByPlaceholderText('Enter hobby');
    const achievementInput = screen.getByPlaceholderText('Enter achievement');
    
    // Simulate input changes
    fireEvent.change(nameInput, { target: { value: 'Ada Lovelace' } });
    fireEvent.change(hobbyInput, { target: { value: 'Playing Piano' } });
    fireEvent.change(achievementInput, { target: { value: 'First Computer Programmer' } });
    
    // Check if inputs updated
    expect(nameInput.value).toBe('Ada Lovelace');
    expect(hobbyInput.value).toBe('Playing Piano');
    expect(achievementInput.value).toBe('First Computer Programmer');
  });

  test('form submission works correctly', async () => {
    render(<UserForm />);
    
    // Get form inputs and submit button
    const nameInput = screen.getByPlaceholderText('Enter name');
    const hobbyInput = screen.getByPlaceholderText('Enter hobby');
    const achievementInput = screen.getByPlaceholderText('Enter achievement');
    const submitButton = screen.getByText('Add Profile');
    
    // Fill form
    fireEvent.change(nameInput, { target: { value: 'Marie Curie' } });
    fireEvent.change(hobbyInput, { target: { value: 'Research' } });
    fireEvent.change(achievementInput, { target: { value: 'Nobel Prize' } });
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Check if fetch was called with correct data
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        femaleinstem: 'Marie Curie',
        hobby: 'Research',
        achievement: 'Nobel Prize'
      })
    });
  });
});