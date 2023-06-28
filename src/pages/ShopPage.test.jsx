import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import ShopPage from './ShopPage';

test('products', async () => {
  shopStore.fetchProducts();

  render((
    <MemoryRouter>
      <ShopPage />
    </MemoryRouter>
  ));

  screen.getByText(/상품이 존재하지 않습니다/);

  await waitFor(() => {
    screen.getByText(/거북이 인형/);
  });
});
