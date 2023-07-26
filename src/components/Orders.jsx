import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Title from './ui/Title';
import ProductTitle from './ui/ProductTitle';
import ProductPrice from './ui/ProductPrice';
import numberFormat from '../utils/numberFormat';

const Order = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10rem;
  overflow: scroll;

  img {
    border: 7px solid #0056a8;
    border-radius: 20%;
  }

  h1 {
    margin: 1rem 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 5rem;
`;

export default function Orders() {
  const shopStore = useShopStore();

  const { orders } = shopStore;

  return (
    <>
      <Title>My Orders</Title>
      <Container>
        <Order>
          {(!orders.length) ? (
            <h1>주문 내역이 없습니다.</h1>
          ) : null}
          {orders.map((order) => (
            <Link style={{ width: '28rem' }} to={`/orders/${order.orderId}`} key={order.orderId}>
              <img src={order.image} alt={order.name} style={{ width: '28rem', height: '28rem' }} />
              <ProductTitle>
                상품 이름 :
                {' '}
                {order.name}
              </ProductTitle>
              <h1>
                수량 :
                {' '}
                {order.quantity}
              </h1>
              <ProductPrice>
                상품 구매 금액 :
                {' '}
                {numberFormat(order.totalPrice)}
                원
              </ProductPrice>
            </Link>
          ))}
        </Order>
      </Container>
    </>
  );
}
