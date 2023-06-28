import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminManagementTable from './AdminManagementTable';
import { shopStore } from '../stores/ShopStore';

test('AdminManagementTable', async () => {
  shopStore.fetchProducts();

  render((
    <MemoryRouter>
      <AdminManagementTable />
    </MemoryRouter>
  ));

  screen.getByText(/상품 관리/);

  await waitFor(() => {
    screen.getAllByRole('button', { name: '수정' });
    screen.getAllByRole('button', { name: '삭제' });
  });
});
