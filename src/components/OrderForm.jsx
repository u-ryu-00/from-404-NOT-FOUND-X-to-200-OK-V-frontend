import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import KakaoPaymentLogo from '../../img/payment_icon_yellow_medium.png';
import Post from './Post';
import InputBox from './ui/InputBox';
import ErrorText from './ui/ErrorText';
import Title from './ui/Title';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`;

const OrderInformation = styled.div`
  display: flex;
`;

const Image = styled.div`
  img {
    border: 7px solid #0056a8;
    border-radius: 20%;
    margin-right: 4rem;
  }
`;

const Information = styled.div`
  h1 {
    font-family: 'Jua';
    font-size: 2rem;
  }
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  padding: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AddressButton = styled.button`
  font-size: 2rem;
  font-family: 'Black Han Sans';
  border: solid 1px;
  margin-left: 1rem;
`;

const PayButton = styled.button`
  width: 40rem;
  margin-top: 1rem;
`;

export default function OrderForm() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const shopStore = useShopStore();

  const {
    userId,
    productId,
    name,
    description,
    image,
    price,
    inventory,
    quantity,
    totalPrice,
  } = shopStore;

  const onSubmit = async (data) => {
    const {
      receiver, phoneNumber, deliveryMessage,
    } = data;

    const addressInput = document.getElementById('address');
    const address = addressInput.value;

    const zonecodeInput = document.getElementById('zonecode');
    const zonecode = zonecodeInput.value;

    await shopStore.requestKakaoPay({
      userId,
      productId,
      name,
      description,
      image,
      price,
      inventory,
      quantity,
      receiver,
      address,
      zonecode,
      phoneNumber,
      deliveryMessage,
      totalPrice,
    });

    window.open(shopStore.kakaoPayPcUrl, '_self');
  };

  const [enrollCompany, setEnrollCompany] = useState({
    address: '',
  });

  const handleInput = (e) => {
    setEnrollCompany({
      ...enrollCompany,
      [e.target.name]: e.target.value,
    });
  };

  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleOpenPost = () => {
    setIsPostOpen(true);
  };

  const handleClosePost = () => {
    setIsPostOpen(false);
  };

  console.log(register('zonecode'));
  console.log(register('receiver'));

  return (
    <div>
      <Container>
        <OrderInformation>
          <Image>
            <img src={shopStore.image} alt="상품 사진" style={{ width: '20rem', height: '20rem' }} />
          </Image>
          <Information>
            <div>
              <h1>
                상품 이름 :
                {' '}
                {shopStore.name}
              </h1>
              <h1>
                수량 :
                {' '}
                {shopStore.quantity}
              </h1>
            </div>
            <div>
              <h1>
                총 합계 :
                {' '}
                {numberFormat(shopStore.totalPrice)}
                원
              </h1>
            </div>
          </Information>
        </OrderInformation>
      </Container>
      <Title>Order Sheet</Title>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmit)} action="kakao.jsp">
          <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
          <div>
            <label htmlFor="receiver">받으시는 분*</label>
            <br />
            <InputBox
              id="receiver"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('receiver', { required: true })}
            />
          </div>
          {errors.receiver ? (
            <ErrorText>받으시는 분 성함을 입력해주세요.</ErrorText>
          ) : null}
          <br />
          <div>
            <label htmlFor="address">주소*</label>
            <AddressButton type="button" onClick={handleOpenPost}>
              🏘️ 주소 입력하기
            </AddressButton>
            <br />
            <InputBox
              id="address"
              placeholder="주소"
              type="text"
              name="address"
              onChange={handleInput}
              value={enrollCompany.address}
            />
          </div>
          <div>
            <label htmlFor="zonecode">우편번호*</label>
            <br />
            <InputBox
              id="zonecode"
              placeholder="우편번호"
              type="text"
              name="zonecode"
              onChange={handleInput}
              value={enrollCompany.zonecode}
            />
          </div>
          {isPostOpen && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <div style={{ background: '#fff', padding: '20px', borderRadius: '5px' }}>
                <Post
                  company={enrollCompany}
                  setcompany={setEnrollCompany}
                  handleClose={handleClosePost}
                />
              </div>
            </div>
          )}
          <br />
          <div>
            <label htmlFor="phoneNumber">휴대전화*</label>
            <br />
            <InputBox
              id="phoneNumber"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('phoneNumber', { required: true })}
            />
          </div>
          {errors.phoneNumber ? (
            <ErrorText>받으시는 분 휴대폰 번호를 입력해주세요.</ErrorText>
          ) : null}
          <br />
          <div>
            <label htmlFor="deliveryMessage">배송메시지</label>
            <br />
            <InputBox
              id="deliveryMessage"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('deliveryMessage', { required: true })}
            />
          </div>
          {/* <SubmitButton type="submit">결제하기</SubmitButton> */}
          <PayButton type="submit"><img src={KakaoPaymentLogo} alt="카카오페이로고" /></PayButton>
        </form>
      </InputContainer>
    </div>
  );
}
