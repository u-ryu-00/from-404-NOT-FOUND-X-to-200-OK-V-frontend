import styled from 'styled-components';
import { shopStore } from '../stores/ShopStore';

const CancelMessage = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export default function PayCancelPage() {
  const orderId = new URL(window.location.href).searchParams.get('orderId');

  shopStore.deleteOrder(orderId);

  return (
    <CancelMessage>카카오 페이 결제를 취소하셨습니다.</CancelMessage>
  );
}
