import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import Title from './ui/Title';
import SubmitButton from './ui/SubmitButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 1rem;
  }
`;

const Information = styled.div`
  display: flex;
  width: 50rem;
`;

const Image = styled.div`
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40rem;
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 4rem;
  gap: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  
  button {
    width: 7rem;
  }
  
  button:first-child {
    margin-right: 1rem;
  }
`;

export default function AdminManagementTable() {
  const shopStore = useShopStore();

  const { products } = shopStore;

  const navigate = useNavigate();

  const handleEditProduct = (productId) => {
    navigate(`/admin/management/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    await shopStore.deleteProduct(productId);
  };

  return (
    <Container>
      <Title>상품 관리</Title>
      <Product>
        {products.map((product) => (
          <div key={product.id}>
            <Information>
              <Image>
                <img src={product.image} alt="상품 사진" style={{ width: '15rem', height: '15rem' }} />
              </Image>
              <Text>
                <h1>
                  상품 이름 :
                  {' '}
                  {product.name}
                </h1>
                <h1>
                  설명 :
                  {' '}
                  {product.description}
                </h1>
                <h1>
                  가격 :
                  {' '}
                  {numberFormat(product.price)}
                  원
                </h1>
                <h1>
                  재고:
                  {' '}
                  {product.inventory}
                  개
                </h1>
                <ButtonBox>
                  <SubmitButton
                    type="button"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    수정
                  </SubmitButton>
                  <SubmitButton
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    삭제
                  </SubmitButton>
                </ButtonBox>
              </Text>
            </Information>

          </div>
        ))}
      </Product>
    </Container>
  );
}
