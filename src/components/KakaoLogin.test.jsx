import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';

test('KakaoLogin', async () => {
  render((
    <MemoryRouter>
      <KakaoLogin />
    </MemoryRouter>
  ));

  screen.getByText(/SNS 계정으로 로그인/);
});
