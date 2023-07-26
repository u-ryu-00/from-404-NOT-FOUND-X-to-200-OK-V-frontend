import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditReviewForm from './EditReviewForm';

test('EditReviewForm', () => {
  render((
    <MemoryRouter>
      <EditReviewForm />
    </MemoryRouter>
  ));

  screen.getByText(/Edit Review/);
  screen.getByText(/WRITE/);
});
