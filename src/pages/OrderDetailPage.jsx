import { useEffect } from 'react';
import useShopStore from '../hooks/useShopStore';
import Order from '../components/Order';

export default function OrderDetailPage() {
  const shopStore = useShopStore();

  shopStore.orderId = window.location.pathname.split('/').pop();

  useEffect(() => {
    shopStore.fetchOrder(shopStore.orderId);
  }, []);

  return (
    <Order />
  );
}
