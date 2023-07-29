import { useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import { shopStore } from '../stores/ShopStore';

export default function OrderPage() {
  const productId = localStorage.getItem('productId')?.replace(/"/gi, '');
  const name = localStorage.getItem('name')?.replace(/"/gi, '');
  const image = localStorage.getItem('image')?.replace(/"/gi, '');
  const quantity = localStorage.getItem('quantity');
  const totalPrice = localStorage.getItem('totalPrice');

  useEffect(() => {
    if (productId) {
      shopStore.fetchProductId(productId);
    }
    if (name) {
      shopStore.fetchName(name);
    }
    if (image) {
      shopStore.fetchImage(image);
    }
    if (quantity) {
      shopStore.fetchQuantity(quantity);
    }
    if (totalPrice) {
      shopStore.fetchTotalPrice(totalPrice);
    }
  }, []);

  return (
    <OrderForm />
  );
}
