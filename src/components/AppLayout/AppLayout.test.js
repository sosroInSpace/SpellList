import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

test('renders the outlet', () => {
  render(
    <MemoryRouter>
      <AppLayout />
    </MemoryRouter>
  );
  const outletElement = screen.getByRole('main');
  expect(outletElement).toBeInTheDocument();
});
