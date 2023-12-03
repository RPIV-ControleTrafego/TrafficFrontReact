import React from 'react';
import { render, screen } from '@testing-library/react';
import Infraction from './Infraction';

test('renders Infraction component', () => {
  render(<Infraction />);
  expect(screen.getByText('Gráficos')).toBeInTheDocument();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

test('initial state of Infraction component', () => {
    render(<Infraction />);
    expect(screen.getByText('Gráficos')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Search Plate')).toHaveValue('');
});

test('toggleAccordion function', () => {
    render(<Infraction />);
    fireEvent.click(screen.getByTestId('accordion-button'));
    expect(screen.getByTestId('accordion-content')).toHaveClass('expanded');
});

// test('searchPlate function', () => {