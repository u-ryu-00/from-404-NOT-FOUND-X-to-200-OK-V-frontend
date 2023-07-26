import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useShopStore from '../hooks/useShopStore';
import Product from '../components/Product';

export default function ProductDetailPage() {
  const shopStore = useShopStore();

  shopStore.productId = window.location.pathname.split('/').pop();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    shopStore.fetchProduct(shopStore.productId);

    shopStore.resetQuantity();

    shopStore.fetchReviews();

    if (accessToken) {
      shopStore.fetchOrders();
    }
  }, []);

  return (
    <div>
      <Product />
    </div>
  );
}
