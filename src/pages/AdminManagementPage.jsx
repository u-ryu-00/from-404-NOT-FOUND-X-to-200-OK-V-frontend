import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminManagementTable from '../components/AdminManagementTable';
import useShopStore from '../hooks/useShopStore';
import Pagination from '../components/Pagination';

const Container = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center;
`;

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
