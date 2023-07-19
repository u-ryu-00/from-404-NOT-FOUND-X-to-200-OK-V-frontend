import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';

export default function Cart() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const shopStore = useShopStore();

  const { carts } = shopStore;

  const minusButtonClick = (cart) => {
    shopStore.minusCartQuantityAndTotalPrice(cart);
  };

  const plusButtonClick = (cart) => {
    shopStore.plusCartQuantityAndTotalPrice(cart);
  };

  const deleteItem = (cart) => {
    shopStore.removeCartItem(cart);
  };

  const totalAmount = carts.reduce((sum, cart) => sum + cart.totalPrice, 0);

  const onSubmit = async (data) => {
    const {
      receiver, address, phoneNumber, deliveryMessage,
    } = data;

    if (totalAmount > shopStore.amount) {
      alert('❌잔액이 부족하여 상품 구매가 불가합니다❌');
      return;
    }

    // shopStore.amount -= totalAmount;

    shopStore.setAmount(totalAmount);

    const insufficientInventory = carts.some((cart) => cart.quantity > cart.inventory);
    if (insufficientInventory) {
      alert('상품 재고보다 더 많은 수량을 선택하셨습니다.');
      return;
    }

    const orderItems = carts.map((cart) => ({
      userId: shopStore.userId,
      productId: cart.productId,
      name: cart.name,
      description: cart.description,
      image: cart.image,
      price: cart.price,
      inventory: cart.inventory,
      quantity: cart.quantity,
      receiver,
      address,
      phoneNumber,
      deliveryMessage,
    }));

    try {
      // 주문을 한 번에 모든 상품들에 대해 보냅니다
      await shopStore.requestOrder(orderItems);

      // 주문이 성공적으로 완료되면 장바구니를 비웁니다
      // shopStore.carts = [];

      // 성공 메시지를 표시하거나 주문 목록 페이지로 이동합니다
      // alert('✅ 결제가 성공적으로 완료되었습니다! ✅');
      navigate('/orders');
    } catch (error) {
      // 주문 요청 중에 발생할 수 있는 오류를 처리합니다
      console.error('주문 중 오류 발생:', error);
      alert('주문 중 오류가 발생했습니다. 다시 시도해주세요.');
    }

    // await Promise.all(orderItems.map(shopStore.requestOrder));

    // shopStore.carts = [];

    // alert('✅ 결제가 성공적으로 완료되었습니다! ✅');

    // navigate('/orders');
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
              <label htmlFor="address">주소*</label>
              <input
                id="address"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('address', { required: true })}
              />
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
              <button type="submit">결제하기</button>
              <button type="submit">카카오페이로 결제</button>
            </form>
          </>
        )}
    </div>
  );
}
