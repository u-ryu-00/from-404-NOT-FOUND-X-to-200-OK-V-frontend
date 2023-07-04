import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { shopStore } from '../stores/ShopStore';
import OrderDetailPage from './OrderDetailPage';

test('OrderDetailPage', async () => {
  await shopStore.fetchOrder(1);

  render((
    <MemoryRouter>
      <OrderDetailPage />
    </MemoryRouter>
  ));

  screen.getByText(/구매 수량/);
  screen.getByText(/소음이 적은 레이저 기계식 키보드/);
});
