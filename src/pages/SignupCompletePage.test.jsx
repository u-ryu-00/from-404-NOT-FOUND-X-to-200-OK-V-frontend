import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupCompletePage from './SignupCompletePage';

test('SignupCompletePage', () => {
  render((
    <MemoryRouter>
      <SignupCompletePage />
    </MemoryRouter>
  ));

  screen.getByText(/회원가입 완료/);
  screen.getByText(/로그인하기/);
});
