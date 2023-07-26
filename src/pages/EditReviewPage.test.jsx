import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditReviewPage from './EditReviewPage';

test('EditReviewPage', () => {
  render((
    <MemoryRouter>
      <EditReviewPage />
    </MemoryRouter>
  ));

  screen.getByText(/Edit Review/);
  screen.getByText(/WRITE/);
});
