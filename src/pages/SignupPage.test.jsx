import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SignupPage from './SignupPage';

test('SignupPage', async () => {
  render((
    <MemoryRouter>
      <SignupPage />
    </MemoryRouter>
  ));

  screen.getByRole('button', { name: 'JOIN' });
});
