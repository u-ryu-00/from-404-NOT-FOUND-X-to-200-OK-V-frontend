import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminHeader from './AdminHeader';

test('AdminHeader', () => {
  render((
    <MemoryRouter>
      <AdminHeader />
    </MemoryRouter>
  ));

  screen.getByText(/홈/);
});
