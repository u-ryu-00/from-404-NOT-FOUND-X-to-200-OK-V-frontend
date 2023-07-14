import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';
import Pagination from '../components/Pagination';
import AdminReviewManagement from '../components/AdminReviewManagement';

export default function AdminReviewManagementPage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const [page, setPage] = useState('');

  useEffect(() => {
    shopStore.fetchReviews(page);
  }, [page]);

  const { totalPages } = shopStore;

  const moveToPage = (clickedPage) => {
    navigate(`?page=${clickedPage}`);
  };

  return (
    <div>
      <AdminReviewManagement />
      <Pagination
        totalPages={totalPages}
        onClick={moveToPage}
        setPage={setPage}
      />
    </div>
  );
}
