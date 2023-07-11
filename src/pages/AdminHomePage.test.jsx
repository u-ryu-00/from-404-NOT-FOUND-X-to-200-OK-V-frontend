import { render, screen } from '@testing-library/react';
import AdminHomePage from './AdminHomePage';

test('AdminHomePage', () => {
  render((
    <AdminHomePage />
  ));

  screen.getByText(/관리자 홈 페이지/);
});
