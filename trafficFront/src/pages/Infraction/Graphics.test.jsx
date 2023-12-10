import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InfractionGraphics from './InfractionGraphics';

test('renders InfractionGraphics component', () => {
  render(<InfractionGraphics />);

  // Check if the component renders without error
  const appElement = screen.getByTestId('infraction-graphics');
  expect(appElement).toBeInTheDocument();

  // Check if the accordionExpanded state is initially false
  const accordionExpanded = screen.getByTestId('accordion-expanded');
  expect(accordionExpanded).toHaveTextContent('false');

  // Check if the accordionExpanded2 state is initially false
  const accordionExpanded2 = screen.getByTestId('accordion-expanded2');
  expect(accordionExpanded2).toHaveTextContent('false');

  // Check if the accordionExpanded3 state is initially false
  const accordionExpanded3 = screen.getByTestId('accordion-expanded3');
  expect(accordionExpanded3).toHaveTextContent('false');

  // Check if the accordionExpanded4 state is initially false
  const accordionExpanded4 = screen.getByTestId('accordion-expanded4');
  expect(accordionExpanded4).toHaveTextContent('false');

  // Check if the data state is initially an empty array
  const data = screen.getByTestId('data');
  expect(data).toHaveTextContent('[]');

  // Check if the searchPlate state is initially an empty string
  const searchPlate = screen.getByTestId('search-plate');
  expect(searchPlate).toHaveValue('');

  // Check if the brandsData state is initially an empty array
  const brandsData = screen.getByTestId('brands-data');
  expect(brandsData).toHaveTextContent('[]');

  // Check if the carTypesData state is initially an empty array
  const carTypesData = screen.getByTestId('car-types-data');
  expect(carTypesData).toHaveTextContent('[]');

  // Check if the userRole state is initially an empty string
  const userRole = screen.getByTestId('user-role');
  expect(userRole).toHaveTextContent('');
});

test('toggleAccordion function', () => {
  render(<InfractionGraphics />);

  // Click the toggle button to expand the accordion
  const toggleButton = screen.getByTestId('toggle-button');
  userEvent.click(toggleButton);

  // Check if the accordionExpanded state is true after clicking the toggle button
  const accordionExpanded = screen.getByTestId('accordion-expanded');
  expect(accordionExpanded).toHaveTextContent('true');

  // Click the toggle button again to collapse the accordion
  userEvent.click(toggleButton);

  // Check if the accordionExpanded state is false after clicking the toggle button again
  expect(accordionExpanded).toHaveTextContent('false');
});

test('downloadCSV function', () => {
  render(<InfractionGraphics />);

  // Call the downloadCSV function
  const downloadButton = screen.getByTestId('download-button');
  userEvent.click(downloadButton);

  // Check if the download link was created correctly
  const link = screen.getByText('Download');
  expect(link).toBeInTheDocument();
});
