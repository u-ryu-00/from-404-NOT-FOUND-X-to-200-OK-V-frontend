import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';
import Products from '../components/Products';
import Pagination from '../components/Pagination';

export default function ShopPage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const [page, setPage] = useState('');

  useEffect(() => {
    shopStore.fetchProducts(page);
  }, [page]);

  const { totalPages } = shopStore;

  const moveToPage = (clickedPage) => {
    navigate(`?page=${clickedPage}`);
  };

  return (
    <div>
      <Products />
      <Pagination
        totalPages={totalPages}
        onClick={moveToPage}
        setPage={setPage}
      />
    </div>
  );
}
