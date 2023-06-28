import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import AdminManagementPage from './AdminManagementPage';

test('AdminManagementTable', async () => {
  shopStore.fetchProducts();

  render((
    <MemoryRouter>
      <AdminManagementPage />
    </MemoryRouter>
  ));

  screen.getByText(/상품 관리/);

  await waitFor(() => {
    screen.getAllByRole('button', { name: '수정' });
    screen.getAllByRole('button', { name: '삭제' });
  });
});
