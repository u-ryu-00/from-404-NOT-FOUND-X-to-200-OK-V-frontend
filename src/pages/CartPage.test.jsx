import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import CartPage from './CartPage';

test('CartPage', async () => {
  shopStore.fetchCart();

  render((
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>
  ));

  screen.getByText(/장바구니에 상품이 없습니다./);

  await waitFor(() => {
    screen.getByText(/내 장바구니 내역입니다./);
    screen.getByText(/거북이 인형/);
  });
});
