import { render, screen, fireEvent } from '@testing-library/react';
import InfractionDashboard from './InfractionDashboard';

test('renders InfractionDashboard component', () => {
  render(<InfractionDashboard />);
  
  // Test that the InfractionDashboard component is rendered correctly
  const dashboardElement = screen.getByTestId('infraction-dashboard');
  expect(dashboardElement).toBeInTheDocument();

  // Test that the initial state of the data and searchPlate variables are set correctly
  expect(dashboardElement).toHaveAttribute('data', []);
  expect(dashboardElement).toHaveAttribute('searchPlate', '');

  // Test toggling the accordions
  fireEvent.click(screen.getByTestId('accordion-1-toggle'));
  expect(screen.getByTestId('accordion-1-content')).toBeVisible();

  fireEvent.click(screen.getByTestId('accordion-2-toggle'));
  expect(screen.getByTestId('accordion-2-content')).toBeVisible();

  fireEvent.click(screen.getByTestId('accordion-3-toggle'));
  expect(screen.getByTestId('accordion-3-content')).toBeVisible();

  fireEvent.click(screen.getByTestId('accordion-4-toggle'));
  expect(screen.getByTestId('accordion-4-content')).toBeVisible();
});
