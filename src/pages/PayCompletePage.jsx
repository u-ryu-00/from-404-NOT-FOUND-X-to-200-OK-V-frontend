import { useEffect } from 'react';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';

const PayCompleteMessage = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export default function PayCompletePage() {
  const shopStore = useShopStore();
  const pgToken = new URL(window.location.href).searchParams.get('pg_token');

  useEffect(() => {
    if (pgToken) {
      shopStore.approveKakaoPay(pgToken);
    }

    shopStore.fetchCart();

    return () => {
      if (pgToken) {
        const { carts } = shopStore;
        for (let i = 0; i < carts.length; i += 1) {
          shopStore.removeCartItem(carts[i]);
        }
      }
      shopStore.fetchCart();
    };
  }, [pgToken, shopStore]);

  return (
    <PayCompleteMessage>카카오 페이 결제가 완료되었습니다.</PayCompleteMessage>
  );
}
