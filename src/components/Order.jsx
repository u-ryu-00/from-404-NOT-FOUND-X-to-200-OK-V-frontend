import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import dateTimeFormat from '../utils/dateTimeFormat';
import SubmitButton from './ui/SubmitButton';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  h1 {
    font-family: 'Do Hyeon';
    display: flex;
    justify-content: space-between;
  }

  p {
    font-family: 'Black Han Sans';
    font-size: 3rem;
    margin: 3rem 0;
  }

  button {
    display: flex;
    font-family: 'Black Han Sans';
    margin-top: 4rem;
    width: 19rem;
  }

  div {
    display: flex;
    width: 45rem;
    justify-content: space-between;
  }

  hr {
    width : 45rem;
    color: #0056a8;
    border: 1px solid;
  }

  h2 {
    font-family: 'Nanum Gothic';
    font-size: 1.5rem;
  }
`;

export default function Order() {
  const shopStore = useShopStore();

  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container>
      <img src={shopStore.image} alt={shopStore.name} style={{ width: '25rem', height: '25rem' }} />
      <p>
        {shopStore.name}
      </p>
      <div>
        <h1>
          구매 수량
        </h1>
        <h2>
          {shopStore.quantity}
          개
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          총 상품금액
        </h1>
        <h2>
          {numberFormat(shopStore.totalPrice)}
          원
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          구매일
        </h1>
        <h2>
          {dateTimeFormat(shopStore.createdAt)}
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          받으시는 분
        </h1>
        <h2>
          {shopStore.receiver}
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          주소
        </h1>
        <h2>
          {shopStore.address}
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          우편번호
        </h1>
        <h2>
          {shopStore.zonecode}
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          휴대전화
        </h1>
        <h2>
          {shopStore.phoneNumber}
        </h2>
      </div>
      <hr />
      <div>
        <h1>
          배송메시지
        </h1>
        <h2>
          {shopStore.deliveryMessage}
        </h2>
      </div>
      <SubmitButton type="button" onClick={() => handleClick(shopStore.productId)}>
        리뷰 작성하러 가기
      </SubmitButton>
    </Container>
  );
}
