import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Post from './Post';
import Title from './ui/Title';
import ErrorText from './ui/ErrorText';
import numberFormat from '../utils/numberFormat';
import InputBox from './ui/InputBox';
import KakaoPaymentLogo from '../../img/payment_icon_yellow_medium.png';

const All = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Product = styled.div`
`;

const ProductImage = styled.div`
  img {
    border: 7px solid #0056a8;
    border-radius: 20%;
    margin-right: 4rem;
  }
`;

const ProductText = styled.div`
  width: 40rem;
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

const DeleteButton = styled.button`
  font-family: 'Black Han Sans';
  font-size: 2rem;
  border: solid 1px;
  margin-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;

  img:first-child {
    border: 5px solid #0056a8;
    border-radius: 20%;
  }

  h1:first-child {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 2rem;
    font-family: 'Jua';
  }

  h1:nth-child(2) {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-family: 'Jua';
  }

  h1:nth-child(3) {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 700;
    font-family: 'Jua';
  }

  hr {
    margin-bottom: 2rem;
    color: #0056a8;
    border: 2px solid;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 700;
    display: flex;
    justify-content: flex-end;
    font-family: 'Jua';
  }
`;

const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;

  p {
    margin-right: 2rem;
    font-family: 'Jua';
  }

  label {
    font-family: 'Jua';
  }

  button {
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
    color: white;
    border-radius: 6px;
    text-align: center;
    transition: top .01s linear;
    text-shadow: 0 1px 0 rgba(0,0,0,0.15);
    margin: 0 .1rem;
    padding: .5rem 1rem .5rem 1rem;

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
  }

  label {
    margin: 0 2rem;
  }  
`;

const PayButton = styled.button`
  width: 40rem;
  margin-top: 1rem;
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

const Total = styled.p`
  display: flex;
  justify-content: flex-end;
  width: 40rem;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Jua';
`;

const CartEmptyMessage = styled.p`
  margin-top: 5rem;
`;

export default function Cart() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const shopStore = useShopStore();

  const { userId } = shopStore;

  const { carts } = shopStore;

  const minusButtonClick = (cart) => {
    shopStore.minusCartQuantityAndTotalPrice(cart);
  };

  const plusButtonClick = (cart) => {
    shopStore.plusCartQuantityAndTotalPrice(cart);
  };

  const totalAmount = carts.reduce((sum, cart) => sum + cart.totalPrice, 0);
  const totalQuantity = carts.reduce((sum, cart) => sum + cart.quantity, 0);

  const deleteItem = (cart) => {
    shopStore.removeCartItem(cart);
  };

  const onSubmit = async (data) => {
    const {
      receiver, phoneNumber, deliveryMessage,
    } = data;

    const addressInput = document.getElementById('address');
    const address = addressInput.value;

    const zonecodeInput = document.getElementById('zonecode');
    const zonecode = zonecodeInput.value;

    const insufficientInventory = carts.some((cart) => cart.quantity > cart.inventory);
    if (insufficientInventory) {
      alert('상품 재고보다 더 많은 수량을 선택하셨습니다.');
      return;
    }

    let productName;
    if (carts.length === 1) {
      productName = carts[0].name;
    } else {
      productName = `${carts[0].name} 외 ${totalQuantity - 1}개`;
    }

    await shopStore.requestKakaoPay({
      userId,
      productId: carts[0].productId,
      name: productName,
      description: carts[0].description,
      image: carts[0].image,
      price: carts[0].price,
      inventory: carts[0].inventory,
      quantity: carts[0].quantity,
      receiver,
      address,
      zonecode,
      phoneNumber,
      deliveryMessage,
      totalPrice: totalAmount,
    });

    for (let i = 0; i < carts.length; i += 1) {
      shopStore.removeCartItem(carts[i]);
    }

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

  return (
    <All>
      {!carts.length
        ? <CartEmptyMessage>장바구니에 상품이 없습니다.</CartEmptyMessage>
        : <Title>My Cart</Title>}
      <Product>
        {carts.map((cart) => (
          <div key={cart.cartId}>
            <Container>
              <ProductImage>
                <img src={cart.image} alt={cart.name} style={{ width: '30rem', height: '30rem' }} />
              </ProductImage>
              <ProductText>
                <h1>{cart.name}</h1>
                <h1>{cart.description}</h1>
                <h1>
                  {numberFormat(cart.price)}
                  원
                </h1>
                <hr />
                <Quantity>
                  <p>구매 수량</p>
                  <button
                    type="button"
                    onClick={() => minusButtonClick(cart)}
                    disabled={cart.quantity <= 1}
                  >
                    -
                  </button>
                  <label>{cart.quantity}</label>
                  <button
                    type="button"
                    onClick={() => plusButtonClick(cart)}
                  >
                    +
                  </button>
                </Quantity>
                <h2>
                  합계 :
                  {' '}
                  {numberFormat(cart.totalPrice)}
                  원
                </h2>
                {cart.inventory === 0 && (
                  <ErrorText>품절 상품입니다. 빠른 시일 내에 재입고 될 수 있도록 하겠습니다.</ErrorText>
                )}
                {cart.inventory !== 0 && cart.quantity > cart.inventory && (
                  <ErrorText>
                    재고가 부족하여
                    {' '}
                    {cart.inventory}
                    개까지만 주문가능합니다.
                  </ErrorText>
                )}
                <div>
                  <DeleteButton
                    type="button"
                    onClick={() => deleteItem(cart)}
                  >
                    장바구니 목록에서 상품 삭제
                  </DeleteButton>
                </div>
              </ProductText>
            </Container>
          </div>
        ))}
      </Product>
      {!carts.length
        ? null
        : (
          <>
            <Title>Order Sheet</Title>
            {!carts.length
              ? null
              : (
                <Total>
                  TOTAL :
                  {' '}
                  {`${numberFormat(totalAmount)}원`}
                </Total>
              )}
            <InputContainer>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    required
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
                    required
                    name="zonecode"
                    onChange={handleInput}
                    value={enrollCompany.zonecode}
                  />
                </div>
                {isPostOpen && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                <PayButton type="submit"><img src={KakaoPaymentLogo} alt="카카오페이로고" /></PayButton>
              </form>
            </InputContainer>
          </>
        )}
    </All>
  );
}
