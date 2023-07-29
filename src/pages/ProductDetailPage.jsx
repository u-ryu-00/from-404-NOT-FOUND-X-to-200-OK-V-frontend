import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useShopStore from '../hooks/useShopStore';
import Product from '../components/Product';

export default function ProductDetailPage() {
  const shopStore = useShopStore();

  shopStore.productId = window.location.pathname.split('/').pop();

  const [accessToken] = useLocalStorage('accessToken', '');

  const [, setProductId] = useLocalStorage('productId', '');

  useEffect(() => {
    shopStore.fetchProduct(shopStore.productId);

    shopStore.resetQuantity();

    shopStore.fetchReviews();

    if (accessToken) {
      shopStore.fetchOrders();
    }

    setProductId(shopStore.productId);
  }, []);

  return (
    <div>
      <Product />
    </div>
  );
}
