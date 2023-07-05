import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import CartModal from './CartModal';

export default function Product() {
  const [accessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  const shopStore = useShopStore();

  const [isPurchaseError, setPurchaseError] = useState(false);

  const [isCartError, setCartError] = useState(false);

  const [isError, setError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const minusButtonClick = () => {
    shopStore.minusQuantityAndTotalPrice();
  };

  const plusButtonClick = () => {
    shopStore.plusQuantityAndTotalPrice();
  };

  const purchaseButtonClick = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    if (shopStore.inventory < shopStore.quantity) {
      setPurchaseError(true);
      return;
    }

    if (shopStore.amount < shopStore.totalPrice) {
      setError(true);
      return;
    }
    navigate('/order');
  };

  const cartButtonClick = () => {
    if (shopStore.inventory < shopStore.quantity) {
      setCartError(true);
      return;
    }
    setShowModal(true);
  };

  // const onSubmit = async (data) => {

  // };

  return (
    <div>
      <img src={shopStore.image} alt="상품 사진" style={{ width: '45rem', height: '45rem' }} />
      <h1>{shopStore.name}</h1>
      <h1>{shopStore.description}</h1>
      <h1>
        {numberFormat(shopStore.price)}
        원
      </h1>
      <h1>구매 수량</h1>
      <button
        type="button"
        onClick={minusButtonClick}
        disabled={shopStore.quantity <= 1}
      >
        -
      </button>
      <label>{shopStore.quantity}</label>
      <button
        type="button"
        onClick={plusButtonClick}
      >
        +
      </button>
      <h1>
        TOTAL:
        {' '}
        {numberFormat(shopStore.totalPrice)}
        원
      </h1>
      <button
        type="button"
        onClick={purchaseButtonClick}
      >
        구매하기
      </button>
      <button
        type="button"
        onClick={cartButtonClick}
      >
        장바구니에 담기
      </button>
      {isPurchaseError
        ? (
          <p>
            재고가 부족하여
            {' '}
            {shopStore.inventory}
            개까지만 주문가능합니다.
          </p>
        ) : null}
      {isCartError
        ? (
          <p>
            재고가 부족하여
            {' '}
            {shopStore.inventory}
            개까지만 장바구니에 담을 수 있습니다.
          </p>
        ) : null}
      {showModal ? <CartModal setShowModal={setShowModal} /> : null}
      {isError ? <p>❌잔액이 부족하여 상품 구매가 불가합니다❌</p> : null}
      <p>Review</p>
      <button type="submit">WRITE</button>
      <form>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="input-title"
          />
        </div>
        <div>
          <label htmlFor="grade">평점</label>
          <label>
            <input type="radio" name="gener" defaultChecked="checked" />
            ★★★★★
          </label>
          <label>
            <input type="radio" name="gener" />
            ★★★★
          </label>
          <label>
            <input type="radio" name="gener" />
            ★★★
          </label>
          <label>
            <input type="radio" name="gener" />
            ★★
          </label>
          <label>
            <input type="radio" name="gener" />
            ★
          </label>
        </div>
        <input />
      </form>
    </div>
  );
}
