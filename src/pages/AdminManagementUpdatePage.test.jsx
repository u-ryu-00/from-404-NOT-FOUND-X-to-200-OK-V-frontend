import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import AdminManagementUpdatePage from './AdminManagementUpdatePage';

test('AdminManagementUpdateForm', () => {
  shopStore.fetchProduct(2);

  render((
    <MemoryRouter>
      <AdminManagementUpdatePage />
    </MemoryRouter>
  ));

  screen.getByRole('button', { name: '상품 수정' });
});
