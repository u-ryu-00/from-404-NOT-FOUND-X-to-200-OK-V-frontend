import { useEffect } from 'react';
import useShopStore from '../hooks/useShopStore';
import Product from '../components/Product';

export default function ProductDetailPage() {
  const shopStore = useShopStore();

  shopStore.productId = window.location.pathname.split('/').pop();

  useEffect(() => {
    shopStore.fetchProduct(shopStore.productId);

    shopStore.resetQuantity();
  }, []);

  return (
    <Product />
  );
}
