import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminReviewManagementPage from './AdminReviewManagementPage';

test('AdminReviewManagementPage', () => {
  render((
    <MemoryRouter>
      <AdminReviewManagementPage />
    </MemoryRouter>
  ));

  screen.getAllByText(/리뷰 관리/);
});
