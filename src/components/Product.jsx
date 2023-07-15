import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useForm } from 'react-hook-form';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import CartModal from './CartModal';

export default function Product() {
  const {
    register, handleSubmit, setValue, reset,
  } = useForm();

  const [accessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  const shopStore = useShopStore();

  const [isPurchaseError, setPurchaseError] = useState(false);

  const [isCartError, setCartError] = useState(false);

  const [isError, setError] = useState(false);

  const [isSoldoutError, setSoldoutError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const {
    userId, productId, image, name, description, price, totalPrice, inventory, quantity,
  } = shopStore;

  const { reviews } = shopStore;

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

    if (shopStore.inventory === 0) {
      setSoldoutError(true);
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

  const cartButtonClick = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    if (shopStore.inventory === 0) {
      setSoldoutError(true);
      return;
    }
    if (shopStore.inventory < shopStore.quantity) {
      setCartError(true);
      return;
    }
    setShowModal(true);

    await shopStore.requestCart({
      userId,
      productId,
      image,
      name,
      description,
      price,
      totalPrice,
      inventory,
      quantity,
    });
  };

  const { orders } = shopStore;

  const onSubmit = async (data) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    const foundOrder = orders.find(
      (order) => Number(order.productId) === Number(shopStore.productId),
    );

    if (!foundOrder) {
      alert('상품을 구매하지 않아 리뷰를 작성하실 수 없습니다.');
      return;
    }

    const {
      title, content,
    } = data;

    const rating = shopStore.ratingValue;

    console.log(rating);

    if (!rating) {
      alert('별점을 선택해주세요.');
      return;
    }

    await shopStore.registerReview({
      userId,
      productId,
      name,
      title,
      rating,
      content,
    });

    shopStore.fetchReviews();

    reset();
  };

  const handleDeleteReview = async (reviewId) => {
    await shopStore.deleteReview(reviewId);
  };

  const handleEditReview = (reviewId) => {
    navigate(`/products/${reviewId}/edit/review`);
  };

  const handleRatingChange = (event) => {
    const selectedRating = event.target.value;
    setValue('rating', selectedRating);
    shopStore.setRating(selectedRating);
  };

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
      {isSoldoutError
        ? (
          <p>품절 상품입니다. 빠른 시일 내에 재입고 될 수 있도록 하겠습니다.</p>
        ) : null}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('title', { required: true })}
        />
        <label htmlFor="rating">별점</label>
        <label>
          <input type="radio" name="rating" value="5" onChange={handleRatingChange} />
          ★★★★★
        </label>
        <label>
          <input type="radio" name="rating" value="4" onChange={handleRatingChange} />
          ★★★★
        </label>
        <label>
          <input type="radio" name="rating" value="3" onChange={handleRatingChange} />
          ★★★
        </label>
        <label>
          <input type="radio" name="rating" value="2" onChange={handleRatingChange} />
          ★★
        </label>
        <label>
          <input type="radio" name="rating" value="1" onChange={handleRatingChange} />
          ★
        </label>
        <label htmlFor="content">리뷰 내용</label>
        <input
          id="content"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('content', { required: true })}
        />
        <button type="submit">WRITE</button>
      </form>
      <div>
        {reviews.map((review) => (
          <div key={review.reviewId}>
            {Number(shopStore.productId) === Number(review.productId)
              ? (
                <>
                  <hr />
                  <h1>{`리뷰아이디 : ${review.reviewId}`}</h1>
                  <h1>{`유저아이디 : ${review.userId}`}</h1>
                  <h1>{`상품아이디 : ${review.productId}`}</h1>
                  <h1>{`상품이름 : ${review.name}`}</h1>
                  <h1>{`리뷰 제목 : ${review.title}`}</h1>
                  {/* <h1>{`별점 : ${review.rating}`}</h1> */}
                  <h1>
                    별점:
                    {' '}
                    {' '}
                    {Array.from({ length: review.rating }, (_, index) => (
                      <span key={index} role="img" aria-label="star">
                        ★
                      </span>
                    ))}
                  </h1>
                  <h1>{`리뷰 내용 : ${review.content}`}</h1>
                  {shopStore.userId === review.userId
                    ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleEditReview(review.reviewId)}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(review.reviewId)}
                        >
                          삭제
                        </button>
                      </div>
                    ) : null}
                  <hr />
                </>
              ) : null}

          </div>
        ))}

      </div>
    </div>
  );
}
