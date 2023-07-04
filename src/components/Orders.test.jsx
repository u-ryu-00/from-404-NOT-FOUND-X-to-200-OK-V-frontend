import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { shopStore } from '../stores/ShopStore';
import Orders from './Orders';

test('Orders', async () => {
  shopStore.fetchOrders();

  render((
    <MemoryRouter>
      <Orders />
    </MemoryRouter>
  ));

  screen.getByText(/주문 내역이 없습니다./);

  await waitFor(() => {
    screen.getByText(/내가 주문한 내역입니다/);

    screen.getByText(/소음이 적은 레이저 기계식 키보드/);
    screen.getByText(/거북이 인형/);
  });
});
