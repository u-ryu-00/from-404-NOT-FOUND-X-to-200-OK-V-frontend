import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Products from '../components/Products';
import Pagination from '../components/Pagination';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ShopPage() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const [page, setPage] = useState('');

  const { products } = shopStore;

  useEffect(() => {
    shopStore.fetchProducts(page);
  }, [page]);

  const { totalPages } = shopStore;

  const moveToPage = (clickedPage) => {
    navigate(`?page=${clickedPage}`);
  };

  return (
    <>
      <Products />
      {(!products.length) ? (
        null)
        : (
          <Container>
            <Pagination
              totalPages={totalPages}
              onClick={moveToPage}
              setPage={setPage}
            />
          </Container>
        )}
    </>
  );
}
