import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProfilePage from './ProfilePage';

jest.mock('axios');

describe('ProfilePage', () => {
  test('should render loading message while fetching profile data', async () => {
    axios.get.mockResolvedValueOnce({ data: null });
    render(<ProfilePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  test('should render error message if fetching profile data fails', async () => {
    const errorMessage = 'Failed to fetch profile data';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    render(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  test('should render profile data if fetched successfully', async () => {
    const profileData = {
      username: 'example_user',
      email: 'example@example.com',
    };
    axios.get.mockResolvedValueOnce({ data: profileData });
    render(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText(`Username: ${profileData.username}`)).toBeInTheDocument();
      expect(screen.getByText(`Email: ${profileData.email}`)).toBeInTheDocument();
    });
  });
});