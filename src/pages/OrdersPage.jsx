import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import useShopStore from '../hooks/useShopStore';
import Pagination from '../components/Pagination';
import Orders from '../components/Orders';

export default function OrdersPage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const [page, setPage] = useState('');

  const pgToken = new URL(window.location.href).searchParams.get('pg_token');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    shopStore.fetchOrders(page);
    shopStore.fetchAccount();

    if (pgToken) {
      shopStore.approveKakaoPay(pgToken);
    }
  }, [page]);

  const { totalPages } = shopStore;

  const moveToPage = (clickedPage) => {
    navigate(`?page=${clickedPage}`);
  };

  return (
    <div>
      <Orders />
      <Pagination totalPages={totalPages} onClick={moveToPage} setPage={setPage} />
    </div>
  );
}
