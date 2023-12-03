import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home page', () => {
  render(<Home />);
  const pageTitle = screen.getByText(/Traffic Today/i);
  expect(pageTitle).toBeInTheDocument();
});

test('renders Card component with correct title and content', () => {
    render(<Card title="Test Title" content="Test Content" />);
    const cardTitle = screen.getByText(/Test Title/i);
    const cardContent = screen.getByText(/Test Content/i);
    expect(cardTitle).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();
  });

  test('renders CardWithStyling component with correct styles', () => {
    render(<CardWithStyling title="Test Title" content="Test Content" style={{ backgroundColor: 'red' }} />);
    const cardWithStyling = screen.getByTestId('card-with-styling');
    expect(cardWithStyling).toHaveStyle('background-color: red');
  });

  test('clicks "Acessar Dados" button in Card component', () => {
    render(<Card title="Test Title" content="Test Content" />);
    const acessarDadosButton = screen.getByText(/Acessar Dados/i);
    expect(acessarDadosButton).toBeInTheDocument();
    fireEvent.click(acessarDadosButton);
  });