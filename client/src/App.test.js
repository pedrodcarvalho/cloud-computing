import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders register form', () => {
  render(<App />);

  expect(screen.getAllByText(/register/i)[0]).toBeInTheDocument();
});
