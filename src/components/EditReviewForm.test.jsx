import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditReviewForm from './EditReviewForm';

test('EditReviewForm', () => {
  render((
    <MemoryRouter>
      <EditReviewForm />
    </MemoryRouter>
  ));

  screen.getByText(/리뷰 수정/);
  screen.getByText(/WRITE/);
});
