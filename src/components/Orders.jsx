import { Link } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';

export default function Orders() {
  const shopStore = useShopStore();

  const { orders } = shopStore;

  return (
    <div>
      {(!orders.length) ? (
        <h1>주문 내역이 없습니다.</h1>
      ) : <h1>내가 주문한 내역입니다.</h1>}
      {orders.map((order) => (
        <Link style={{ width: '28rem' }} to={`/orders/${order.orderId}`} key={order.orderId}>
          <img src={order.image} alt={order.name} style={{ width: '28rem', height: '28rem' }} />
          <h1>
            상품 이름 :
            {' '}
            {order.name}
          </h1>
          <h1>
            수량 :
            {' '}
            {order.quantity}
          </h1>
          <h1>
            상품 구매 금액 :
            {' '}
            {order.totalPrice}
          </h1>
        </Link>
      ))}
    </div>
  );
}
