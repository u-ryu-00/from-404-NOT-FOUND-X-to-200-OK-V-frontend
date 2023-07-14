import { render, screen } from '@testing-library/react';
import AdminReviewManagement from './AdminReviewManagement';

test('AdminReviewManagement', () => {
  render((
    <AdminReviewManagement />
  ));

  screen.getAllByText(/리뷰 관리/);
});
