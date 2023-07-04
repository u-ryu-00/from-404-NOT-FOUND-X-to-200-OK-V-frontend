import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SignupForm from './SignupForm';

test('SignupForm', async () => {
  render((
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  ));

  screen.getByRole('button', { name: 'JOIN' });
});
