import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('renders the dashboard buttons', () => {
    render(<App />);

    expect(screen.getByText('Gráficos')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('fetches data and displays it', async () => {
    const testData = [
    ];

    axios.get.mockResolvedValueOnce({ data: testData });
    render(<App />);

    await screen.findByText('Data Item 1');
    await screen.findByText('Data Item 2');
  });

  it('fetches brands data and displays it', async () => {
    const brandsData = [
    ];

    axios.get.mockResolvedValueOnce({ data: brandsData });

    render(<App />);

    await screen.findByText('Brand 1');
    await screen.findByText('Brand 2');
  });

  it('fetches car types data and displays it', async () => {
    const carTypesData = [
    ];

    axios.get.mockResolvedValueOnce({ data: carTypesData });
    render(<App />);

    await screen.findByText('Car Type 1');
    await screen.findByText('Car Type 2');
  });

  it('handles errors when fetching data', async () => {
    const errorMessage = 'An error occurred';

    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    render(<App />);

    await screen.findByText(errorMessage);
  });
});
