import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartModal from './CartModal';

test('CartModal', () => {
  render((
    <MemoryRouter>
      <CartModal />
    </MemoryRouter>
  ));

  screen.getByText(/장바구니 담기/);
  screen.getByText(/장바구니에 상품이 정상적으로 담겼습니다./);
  screen.getByText(/장바구니 이동/);
});
