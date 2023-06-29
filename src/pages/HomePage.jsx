import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import MainBanner from '../../img/MainBanner.png';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';

const Logo = styled.img`
  width: 126rem;
  height: 40rem;
  background-image: url(${MainBanner});
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
      <Logo />
      <h1>Shop</h1>
      {products.map((product) => {
        if (product.id <= 4) {
          return (
            <div key={product.id}>
              <img src={product.image} alt="상품 사진" style={{ width: '28rem', height: '28rem' }} />
              <h1>{product.name}</h1>
              <h1>
                {numberFormat(product.price)}
                원
              </h1>
            </div>
          );
        }
        return null;
      })}
      <button type="button" onClick={shopMoreButtonClick}>SHOP MORE</button>
    </div>
  );
}
