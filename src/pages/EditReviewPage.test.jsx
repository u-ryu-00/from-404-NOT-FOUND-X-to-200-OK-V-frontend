import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditReviewPage from './EditReviewPage';

test('EditReviewPage', () => {
  render((
    <MemoryRouter>
      <EditReviewPage />
    </MemoryRouter>
  ));

  screen.getByText(/리뷰 수정/);
  screen.getByText(/WRITE/);
});
