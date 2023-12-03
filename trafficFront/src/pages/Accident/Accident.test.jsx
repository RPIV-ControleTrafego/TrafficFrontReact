import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Accident from './Accident';

test('renders Accident component', () => {
  render(<Accident />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('toggles accordion on click', () => {
  render(<Accident />);
  const accordion = screen.getByTestId('accordion');
  fireEvent.click(accordion);
  expect(accordion).toHaveClass('expanded');
});

test('downloads CSV file on button click', () => {
  render(<Accident />);
  const downloadButton = screen.getByText(/Download/i);
  fireEvent.click(downloadButton);
});

test('navigates to graphics page on button click', () => {
  render(<Accident />);
  const graphicsButton = screen.getByText(/Dashboard/i);
  fireEvent.click(graphicsButton);
});
