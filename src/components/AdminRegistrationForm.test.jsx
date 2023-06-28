import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminRegistrationForm from './AdminRegistrationForm';

test('AdminRegistrationForm', () => {
  render((
    <MemoryRouter>
      <AdminRegistrationForm />
    </MemoryRouter>
  ));

  screen.getAllByText(/상품 등록/);
});
