import useShopStore from '../hooks/useShopStore';
import dateTimeFormat from '../utils/dateTimeFormat';

export default function Order() {
  const shopStore = useShopStore();

  return (
    <div>
      <img src={shopStore.image} alt={shopStore.name} style={{ width: '25rem', height: '25rem' }} />
      <h1>
        상품 이름 :
        {' '}
        {shopStore.name}
      </h1>
      <h1>
        구매 수량 :
        {' '}
        {shopStore.quantity}
      </h1>
      <h1>
        총 상품금액 :
        {' '}
        {shopStore.totalPrice}
      </h1>
      <h1>
        구매일 :
        {' '}
        {dateTimeFormat(shopStore.createdAt)}
      </h1>
      <h1>
        받으시는 분 :
        {' '}
        {shopStore.receiver}
      </h1>
      <h1>
        주소 :
        {' '}
        {shopStore.address}
      </h1>
      <h1>
        휴대전화 :
        {' '}
        {shopStore.phoneNumber}
      </h1>
      <h1>
        배송메시지 :
        {' '}
        {shopStore.deliveryMessage}
      </h1>
    </div>
  );
}
