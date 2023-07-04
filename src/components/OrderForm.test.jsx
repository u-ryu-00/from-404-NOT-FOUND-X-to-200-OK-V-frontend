import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import OrderForm from './OrderForm';

test('OrderForm', async () => {
  await shopStore.requestOrder({
    userId: 'a111',
    productId: 1,
    name: '소음이 적은 레이저 기계식 키보드',
    description: '저소음 적축 레이저 기계식 키보드입니다.',
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
    price: 49_000,
    inventory: 2,
    quantity: 1,
    receiver: '받는 사람',
    address: '주소',
    phoneNumber: '010-1234-5678',
    deliveryMessage: '배송 메시지',
  });

  render((
    <MemoryRouter>
      <OrderForm />
    </MemoryRouter>
  ));

  screen.getByText(/받으시는 분/);
});
