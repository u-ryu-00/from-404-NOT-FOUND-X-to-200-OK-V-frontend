import { rest } from 'msw';

import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userId, password } = await req.json();
    if (userId === 'a111' && password === 'Aa1!!!!!') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '내이름',
        amount: 500_000,
      }));
    }
    return res(ctx.status(400));
  }),
  rest.get(`${baseUrl}/accounts/me`, async (req, res, ctx) => res(ctx.json({
    userId: 'a111',
    amount: 500_000,
  }))),
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(ctx.json({
    products: [
      {
        id: 1,
        name: '소음이 적은 레이저 기계식 키보드',
        description: '저소음 적축 레이저 기계식 키보드입니다.',
        iamge: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
        price: 49_000,
        inventory: 2,
      },
      {
        id: 2,
        name: '거북이 인형',
        description: '귀여운 사이즈의 거북이 인형입니다!',
        iamge: 'https://images.unsplash.com/photo-1488723905857-809bb9a2d21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        price: 30_000,
        inventory: 3,
      },
    ],
  }))),
  rest.get(`${baseUrl}/products/2`, async (req, res, ctx) => res(ctx.json({
    name: '거북이 인형',
    description: '귀여운 사이즈의 거북이 인형입니다!',
    image: 'https://images.unsplash.com/photo-1488723905857-809bb9a2d21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 30_000,
    inventory: 3,
  }))),
  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(ctx.json({
    orders: [
      {
        orderId: 1,
        userId: 'a111',
        productId: 1,
        name: '소음이 적은 레이저 기계식 키보드',
        description: '저소음 적축 레이저 기계식 키보드입니다.',
        image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
        price: 49_000,
        inventory: 2,
        quantity: 1,
        totalPrice: 49_000,
        receiver: '받는 사람',
        address: '주소',
        phoneNumber: '010-1234-5678',
        deliveryMessage: '배송 메시지',
        createdAt: '2023-07-03',
      },
      {
        orderId: 2,
        userId: 'a111',
        productId: 2,
        name: '거북이 인형',
        description: '귀여운 사이즈의 거북이 인형입니다!',
        image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
        price: 30_000,
        inventory: 3,
        quantity: 1,
        totalPrice: 30_000,
        receiver: '받는 사람',
        address: '주소',
        phoneNumber: '010-1234-5678',
        deliveryMessage: '배송 메시지',
        createdAt: '2023-07-03',
      },
    ],
  }))),
  rest.get(`${baseUrl}/orders/1`, async (req, res, ctx) => res(ctx.json({
    orderId: 1,
    userId: 'a111',
    productId: 1,
    name: '소음이 적은 레이저 기계식 키보드',
    description: '저소음 적축 레이저 기계식 키보드입니다.',
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
    price: 49_000,
    inventory: 2,
    quantity: 1,
    totalPrice: 49_000,
    receiver: '받는 사람',
    address: '주소',
    phoneNumber: '010-1234-5678',
    deliveryMessage: '배송 메시지',
    createdAt: '2023-07-03',
  }))),
  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => res(ctx.json({
    orderId: 1,
    userId: 'a111',
    productId: 1,
    name: '소음이 적은 레이저 기계식 키보드',
    description: '저소음 적축 레이저 기계식 키보드입니다.',
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
    price: 49_000,
    inventory: 2,
    quantity: 1,
    totalPrice: 49_000,
    receiver: '받는 사람',
    address: '주소',
    phoneNumber: '010-1234-5678',
    deliveryMessage: '배송 메시지',
    createdAt: '2023-07-03',
  }))),
  rest.get(`${baseUrl}/cart`, async (req, res, ctx) => res(ctx.json({
    carts: [
      {
        cartId: 1,
        productId: 1,
        image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80',
        name: '소음이 적은 레이저 기계식 키보드',
        description: '저소음 적축 레이저 기계식 키보드입니다.',
        price: 49_000,
        totalPrice: 49_000,
        inventory: 2,
        quantity: 1,
      },
      {
        cartId: 2,
        productId: 2,
        image: 'https://images.unsplash.com/photo-1488723905857-809bb9a2d21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        name: '거북이 인형',
        description: '귀여운 사이즈의 거북이 인형입니다!',
        price: 30_000,
        totalPrice: 30_000,
        inventory: 3,
        quantity: 1,
      },
    ],

  }))),
);

export default server;
