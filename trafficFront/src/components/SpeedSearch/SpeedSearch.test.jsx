import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import SpeedSearchLworGt from './SpeedSearchLworGt';

jest.mock('axios');

describe('SpeedSearchLworGt', () => {
  test('renders the form correctly', () => {
    render(<SpeedSearchLworGt />);
    
    const speedInput = screen.getByPlaceholderText('Velocidade (Km/h)');
    const typeSelect = screen.getByRole('combobox');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });

    expect(speedInput).toBeInTheDocument();
    expect(typeSelect).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('updates speed state on input change', () => {
    render(<SpeedSearchLworGt />);
    
    const speedInput = screen.getByPlaceholderText('Velocidade (Km/h)');
    fireEvent.change(speedInput, { target: { value: '120' } });

    expect(speedInput.value).toBe('120');
  });

  test('updates gtorLw state on select change', () => {
    render(<SpeedSearchLworGt />);
    
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'speed-lower' } });

    expect(typeSelect.value).toBe('speed-lower');
  });

  test('calls fetchSpeedSearch function on form submit', () => {
    render(<SpeedSearchLworGt />);
    
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(searchButton);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8086/infraction/speed-greater/');
  });

  test('calls closeModal function on Modal close', () => {
    render(<SpeedSearchLworGt />);
    
    const modalCloseButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(modalCloseButton);

    expect(screen.queryByText('Modal content')).toBeNull();
  });

  test('calls downloadCSV function on Modal download click', () => {
    render(<SpeedSearchLworGt />);
    
    const modalDownloadButton = screen.getByRole('button', { name: 'Download CSV' });
    fireEvent.click(modalDownloadButton);

    expect(screen.queryByText('Downloading...')).toBeInTheDocument();
  });
});
