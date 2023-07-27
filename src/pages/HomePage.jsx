/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import ProductTitle from '../components/ui/ProductTitle';
import ProductPrice from '../components/ui/ProductPrice';
import Title from '../components/ui/Title';

const Box = styled.h1`
  font-size: 6rem;
  color: #FFFFFF;
  font-family: 'Darumadrop One';
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50rem;
  border:none;
  background: rgb(0,172,238);

  --mask: 
  linear-gradient(to top ,#0000 25px,#000 0),
  radial-gradient(25px, #000 98%, #0000) 50% / 46.25px 50px repeat space;

  -webkit-mask: var(--mask);
  mask: var(--mask);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10rem;
  overflow: scroll;

  img {
    border: 7px solid #0056a8;
    border-radius: 20%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0056a8;
  color: #FFFFFF;
  font-family: 'Darumadrop One';
  font-size: 4rem;

  position: relative;
  display: inline-block;
  font-size: 22px;
  padding: 20px 60px;
  color: white;
  border-radius: 6px;
  text-align: center;
  transition: top .01s linear;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);

  &:hover {
    animation: jelly 0.5s;
  }

  @keyframes jelly {
    25% {
      transform: scale(0.9, 1.1);
    }

    50% {
      transform: scale(1.1, 0.9);
    }

    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`;

const ProductEmptyMessage = styled.p`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;

export default function HomePage() {
  const navigate = useNavigate();

  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchProducts();
  }, []);

  const shopMoreButtonClick = () => {
    navigate('/products');
  };

  const { products } = shopStore;

  return (
    <div>
      <Box>
        from 404 NOT FOUND X to 200 OK V
      </Box>
      <Title>Shop</Title>
      {(!products.length) ? (
        <ProductEmptyMessage>상품이 존재하지 않습니다.</ProductEmptyMessage>
      )
        : null}
      <Container>
        <Product>
          {products.map((product) => {
            if (product.id <= 6) {
              return (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <img src={product.image} alt="상품 사진" style={{ width: '30rem', height: '30rem' }} />
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductPrice>
                    {numberFormat(product.price)}
                    원
                  </ProductPrice>
                </Link>
              );
            }
            return null;
          })}
        </Product>
      </Container>
      <ButtonBox>
        <Button type="button" onClick={shopMoreButtonClick}>SHOP MORE</Button>
      </ButtonBox>
    </div>
  );
}
