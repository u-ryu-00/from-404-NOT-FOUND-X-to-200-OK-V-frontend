import { useEffect } from 'react';
import useShopStore from '../hooks/useShopStore';
import Products from '../components/Products';

export default function ShopPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchProducts();
  }, []);

  return (
    <div>
      <Products />
    </div>
  );
}
