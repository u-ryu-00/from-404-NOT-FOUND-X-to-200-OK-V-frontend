import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { shopStore } from '../stores/ShopStore';
import Order from './Order';

test('Order', async () => {
  await shopStore.fetchOrder(1);

  render((
    <MemoryRouter>
      <Order />
    </MemoryRouter>
  ));

  screen.getByText(/구매 수량/);
  screen.getByText(/소음이 적은 레이저 기계식 키보드/);
});
