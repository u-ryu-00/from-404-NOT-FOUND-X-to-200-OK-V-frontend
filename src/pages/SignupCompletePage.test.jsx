import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupCompletePage from './SignupCompletePage';

test('SignupCompletePage', () => {
  render((
    <MemoryRouter>
      <SignupCompletePage />
    </MemoryRouter>
  ));

  screen.getByText(/회원가입이 완료되었습니다./);
  screen.getByText(/Log in/);
});
