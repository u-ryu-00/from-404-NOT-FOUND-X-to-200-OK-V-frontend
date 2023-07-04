import { render, screen } from '@testing-library/react';
import Account from './Account';
import { shopStore } from '../stores/ShopStore';

test('Account', async () => {
  await shopStore.fetchAccount();

  render(<Account />);

  screen.getByText(/내 잔액: 500,000원/);
});
