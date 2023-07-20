import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useShopStore from '../hooks/useShopStore';
import Post from './Post';

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
      receiver, address, zonecode, phoneNumber, deliveryMessage,
    } = data;

    if (totalAmount > shopStore.amount) {
      alert('❌잔액이 부족하여 상품 구매가 불가합니다❌');
      return;
    }

    const insufficientInventory = carts.some((cart) => cart.quantity > cart.inventory);
    if (insufficientInventory) {
      alert('상품 재고보다 더 많은 수량을 선택하셨습니다.');
      return;
    }

    // const orderItems = carts.map((cart) => ({
    //   userId: shopStore.userId,
    //   productId: cart.productId,
    //   name: cart.name,
    //   description: cart.description,
    //   image: cart.image,
    //   price: cart.price,
    //   inventory: cart.inventory,
    //   quantity: cart.quantity,
    //   receiver,
    //   address,
    //   phoneNumber,
    //   deliveryMessage,
    //   totalPrice: totalAmount,
    // }));

    // await Promise.all(orderItems.map(shopStore.requestOrder));

    let productName;
    if (carts.length === 1) {
      productName = carts[0].name;
    } else {
      productName = `${carts[0].name} 외 ${totalQuantity - 1}`;
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

  console.log(`---${enrollCompany.address}`);
  console.log(`---${enrollCompany.zonecode}`);

  const handleInput = (e) => {
    setEnrollCompany({
      ...enrollCompany,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {!carts.length
        ? <h1>장바구니에 상품이 없습니다.</h1>
        : <h1>내 장바구니 내역입니다.</h1>}
      {carts.map((cart) => (
        <div key={cart.cartId}>
          <img src={cart.image} alt={cart.name} style={{ width: '28rem', height: '28rem' }} />
          <h1>
            상품 이름 :
            {' '}
            {cart.name}
          </h1>
          <h1>
            가격 :
            {' '}
            {cart.price}
          </h1>
          <h1>구매 수량</h1>
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
          <h1>
            수량 :
            {' '}
            {cart.quantity}
          </h1>
          <h1>
            합계 :
            {' '}
            {cart.totalPrice}
          </h1>
          <button
            type="button"
            onClick={() => deleteItem(cart)}
          >
            장바구니 목록에서 상품 삭제
          </button>
          {cart.inventory === 0 && (
            <p>품절 상품입니다. 빠른 시일 내에 재입고 될 수 있도록 하겠습니다.</p>
          )}
          {cart.quantity > cart.inventory && (
            <p>
              재고가 부족하여
              {' '}
              {cart.inventory}
              개까지만 주문가능합니다.
            </p>
          )}
        </div>
      ))}
      {!carts.length
        ? null
        : (
          <h1>
            총 합계 :
            {' '}
            {totalAmount}
          </h1>
        )}
      <hr />
      {!carts.length
        ? null
        : (
          <>
            <p>주문서 작성</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="receiver">받으시는 분*</label>
              <input
                id="receiver"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('receiver', { required: true })}
              />
              {errors.receiver ? (
                <p>받으시는 분 성함을 입력해주세요.</p>
              ) : null}
              <br />
              <div>
                <label htmlFor="address">주소*</label>
                <input
                  id="address"
                  placeholder="주소"
                  type="text"
                  required
                  name="address"
                  onChange={handleInput}
                  value={enrollCompany.address}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('address', { required: true })}
                />
              </div>
              <div>
                <label htmlFor="zonecode">우편번호*</label>
                <input
                  id="zonecode"
                  placeholder="우편번호"
                  type="text"
                  required
                  name="zonecode"
                  onChange={handleInput}
                  value={enrollCompany.zonecode}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('zonecode', { required: true })}
                />
              </div>
              <Post company={enrollCompany} setcompany={setEnrollCompany} />
              <br />
              <label htmlFor="phoneNumber">휴대전화*</label>
              <input
                id="phoneNumber"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('phoneNumber', { required: true })}
              />
              <br />
              <label htmlFor="deliveryMessage">배송메시지</label>
              <input
                id="deliveryMessage"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('deliveryMessage', { required: true })}
              />
              {/* <button type="submit">결제하기</button> */}
              <button type="submit">카카오페이로 결제</button>
            </form>
          </>
        )}
    </div>
  );
}
