import { useForm } from 'react-hook-form';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';

export default function OrderForm() {
  const { register, handleSubmit } = useForm();

  const shopStore = useShopStore();

  const {
    productId, name, description, image, price, quantity,
  } = shopStore;

  const onSubmit = async (data) => {
    const {
      receiver, address, phoneNumber, deliveryMessage,
    } = data;

    await shopStore.requestOrder({
      productId,
      name,
      description,
      image,
      price,
      quantity,
    });
  };

  return (
    <div>
      <img src={shopStore.image} alt="상품 사진" style={{ width: '45rem', height: '45rem' }} />
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="receiver">받으시는 분*</label>
        <input
          id="receiver"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('receiver', { required: true })}
        />
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
        <p>
          총 합계 :
          {' '}
          {numberFormat(shopStore.totalPrice)}
          원
        </p>
        <button type="button">결제하기</button>
      </form>
    </div>
  );
}
