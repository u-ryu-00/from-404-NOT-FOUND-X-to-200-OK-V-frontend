import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

test('LoginPage', () => {
  render((
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  ));

  screen.getByText(/LOG IN/);
  screen.getByRole('button', { name: 'Log in' });
});
