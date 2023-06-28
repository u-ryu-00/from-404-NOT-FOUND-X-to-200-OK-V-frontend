import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminRegistrationPage from './AdminRegistrationPage';

test('AdminRegistrationForm', () => {
  render((
    <MemoryRouter>
      <AdminRegistrationPage />
    </MemoryRouter>
  ));

  screen.getAllByText(/상품 등록/);
});
