import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { shopStore } from '../stores/ShopStore';
import Product from './Product';

test('Product', async () => {
  await shopStore.fetchProduct(2);

  render((
    <MemoryRouter>
      <Product />
    </MemoryRouter>
  ));

  screen.getByText(/귀여운 사이즈의 거북이 인형입니다!/);
  screen.getByText(/구매하기/);
});
