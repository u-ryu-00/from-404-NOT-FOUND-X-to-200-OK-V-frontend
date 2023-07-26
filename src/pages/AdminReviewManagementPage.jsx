import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Pagination from '../components/Pagination';
import AdminReviewManagement from '../components/AdminReviewManagement';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
      <Container>
        <Pagination
          totalPages={totalPages}
          onClick={moveToPage}
          setPage={setPage}
        />
      </Container>
    </div>
  );
}
