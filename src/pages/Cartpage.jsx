import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useShopStore from '../hooks/useShopStore';
import Pagination from '../components/Pagination';
import Cart from '../components/Cart';

export default function CartPage() {
  const shopStore = useShopStore();

  const [page, setPage] = useState('');

  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    shopStore.fetchCart(page);
  }, [page]);

  const { totalPages } = shopStore;

  const moveToPage = (clickedPage) => {
    navigate(`?page=${clickedPage}`);
  };

  return (
    <div>
      <Cart />
      <Pagination
        totalPages={totalPages}
        onClick={moveToPage}
        setPage={setPage}
      />
    </div>
  );
}
