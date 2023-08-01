import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import Title from './ui/Title';
import ProductTitle from './ui/ProductTitle';
import ProductPrice from './ui/ProductPrice';

const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10rem;
  overflow: scroll;

  img {
    border: 7px solid #0056a8;
    border-radius: 20%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductEmptyMessage = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export default function Products() {
  const shopStore = useShopStore();

  const { products } = shopStore;

  const sortedProducts = products.slice().sort((a, b) => a.id - b.id);

  return (
    <>
      <Title>Shop</Title>
      {(!products.length) ? (
        <ProductEmptyMessage>상품이 존재하지 않습니다.</ProductEmptyMessage>
      ) : null}
      <Container>
        <Product>
          {sortedProducts.map((product) => (
            <a href={`/products/${product.id}`} key={product.id}>
              <img src={product.image} alt="상품 사진" style={{ width: '28rem', height: '28rem' }} />
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>
                {numberFormat(product.price)}
                원
              </ProductPrice>
            </a>
          ))}
        </Product>
      </Container>
    </>
  );
}
