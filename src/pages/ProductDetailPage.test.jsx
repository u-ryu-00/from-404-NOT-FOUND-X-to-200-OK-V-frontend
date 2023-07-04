import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { shopStore } from '../stores/ShopStore';
import ProductDetailPage from './ProductDetailPage';

test('ProductDetailPage', async () => {
  await shopStore.fetchProduct(2);

  render((
    <MemoryRouter>
      <ProductDetailPage />
    </MemoryRouter>
  ));

  screen.getByText(/귀여운 사이즈의 거북이 인형입니다!/);
  screen.getByText(/구매하기/);
});
