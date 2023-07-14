import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';
import Product from '../components/Product';
import Pagination from '../components/Pagination';

export default function ProductDetailPage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  shopStore.productId = window.location.pathname.split('/').pop();

  const [page, setPage] = useState('');

  useEffect(() => {
    shopStore.fetchProduct(shopStore.productId);

    shopStore.resetQuantity();

    shopStore.fetchReviews(page);

    shopStore.fetchOrders();
  }, [page]);

  const { totalPages } = shopStore;

  const moveToPage = (clickedPage) => {
    navigate(`?page=${clickedPage}`);
  };

  return (
    <div>
      <Product />
      <Pagination totalPages={totalPages} onClick={moveToPage} setPage={setPage} />
    </div>
  );
}
