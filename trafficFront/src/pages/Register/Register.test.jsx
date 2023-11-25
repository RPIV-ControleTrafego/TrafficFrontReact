import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from './Register';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children),
  useNavigate: jest.fn(),
}));

// Mock the axios.post function
jest.mock('axios');

describe('Register', () => {
  it('should handle sign up with valid email and password', async () => {
    // Mock the useState hook
    jest.spyOn(React, 'useState').mockImplementation((initialValue) => [initialValue, jest.fn()]);

    // Mock the axios.post function
    axios.post.mockResolvedValueOnce({ status: 200 });

    // Render the Register component
    const { getByLabelText, getByText } = render(<Register />);

    // Set the username, email, and password input values
    const usernameInput = getByLabelText('username');
    const emailInput = getByLabelText('E-mail');
    const passwordInput = getByLabelText('Senha');
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Click the 'Cadastrar' button
    const cadastrarButton = getByText('Cadastrar');
    fireEvent.click(cadastrarButton);

    // Expect the axios.post function to be called with the correct data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:7000/user/register', {
      username: 'johndoe',
      password: 'password123',
      email: 'johndoe@gmail.com',
    });

    // Expect the page to navigate to '/'
    expect(useNavigate).toHaveBeenCalledWith('/');

    // Wait for any asynchronous operations to finish
    await waitFor(() => {});

  });
});