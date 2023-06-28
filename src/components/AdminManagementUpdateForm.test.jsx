import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import AdminManagementUpdateForm from './AdminManagementUpdateForm';

test('AdminManagementUpdateForm', () => {
  shopStore.fetchProduct(2);

  render((
    <MemoryRouter>
      <AdminManagementUpdateForm />
    </MemoryRouter>
  ));

  screen.getByRole('button', { name: '상품 수정' });
});
