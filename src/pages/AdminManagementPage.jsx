import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminManagementTable from '../components/AdminManagementTable';
import useShopStore from '../hooks/useShopStore';
import Pagination from '../components/Pagination';

export default function AdminManagementPage() {
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
      <AdminManagementTable />
      <Pagination
        totalPages={totalPages}
        onClick={moveToPage}
        setPage={setPage}
      />
    </div>
  );
}
