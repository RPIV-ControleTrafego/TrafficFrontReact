import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AdminPage from './AdminPage';

jest.mock('axios');

describe('AdminPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, username: 'user1', role: 'admin' },
        { id: 2, username: 'user2', role: 'user' },
      ],
    });
  });

  test('should render users', async () => {
    render(<AdminPage />);

    // Wait for users to be loaded
    await screen.findByText('user1');
    await screen.findByText('user2');

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  test('should change user role', async () => {
    render(<AdminPage />);

    // Wait for users to be loaded
    await screen.findByText('user1');

    // Select a user
    fireEvent.click(screen.getByText('user1'));

    // Open modal
    fireEvent.click(screen.getByText('Alterar Papel'));

    // Change role
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'user' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Alterar Papel'));

    // Wait for role to be changed
    await screen.findByText('Papel do usuário alterado: user');

    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:7000/user/changeRole/user1',
      { username: 'user1', role: 'user' }
    );
  });

  test('should delete user', async () => {
    render(<AdminPage />);

    // Wait for users to be loaded
    await screen.findByText('user1');

    // Select a user
    fireEvent.click(screen.getByText('user1'));

    // Open modal
    fireEvent.click(screen.getByText('Deletar'));

    // Delete user
    fireEvent.click(screen.getByText('Deletar'));

    // Wait for user to be deleted
    await screen.findByText('Usuário deletado: user1');

    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:7000/user/deleteUser/user1'
    );
  });
});