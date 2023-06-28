import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import Products from './Products';

test('products', async () => {
  shopStore.fetchProducts();

  render((
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  ));

  screen.getByText(/상품이 존재하지 않습니다/);

  await waitFor(() => {
    screen.getByText(/거북이 인형/);
  });
});
