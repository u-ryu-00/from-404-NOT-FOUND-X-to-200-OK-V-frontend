import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';
import CartModal from './CartModal';
import SubmitButton from './ui/SubmitButton';
import ErrorText from './ui/ErrorText';
import Title from './ui/Title';
import InputBox from './ui/InputBox';

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10rem 5rem;

  img:first-child {
    border: 7px solid #0056a8;
    border-radius: 20%;
  }

  h1:first-child {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 4rem;
    font-family: 'Jua';
  }

  h1:nth-child(2) {
    font-size: 2rem;
    margin-bottom: 4rem;
    font-family: 'Jua';

  }

  h1:nth-child(3) {
    font-size: 2rem;
    margin-bottom: 4rem;
    font-weight: 700;
    font-family: 'Jua';
  }

  hr {
    margin-bottom: 3rem;
    color: #0056a8;
    border: 3px solid;
  }

  h2 {
    font-size: 4rem;
    margin-bottom: 4rem;
    font-weight: 700;
    display: flex;
    justify-content: flex-end;
    font-family: 'Jua';
  }
`;

const ProductDetail = styled.div`
  margin-left: 9rem;
`;

const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 4rem;

  p {
    margin-right: 4rem;
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
    margin: 0 .2rem;
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  button:first-child{
    background-color: #E66826;
    width: 30rem;
    margin-right: 1rem;
    font-family:'Jua';
    font-size: 3rem;
  }

  button:nth-child(2){
    width: 20rem;
    font-family:'Jua';
  }
`;

const Review = styled.div`
  display: flex;
  justify-content: center;

  textarea {
    border: 1px solid rgb(216, 216, 216);
    color: rgb(160, 160, 160);
    width: 40rem;
    padding: 1rem;
    height: 16rem;
    margin: 1rem 0 3.5rem 0; 
  }

  img {
    width: 40rem;
    height: 40rem;
    margin-top: 1rem;
  }
`;

const ReviewText = styled.div`
  margin-right: 6rem;

  div:nth-child(2){
    margin: 2rem 0 3rem 0;
  }
`;

const ReviewImage = styled.div`
`;

const UserReview = styled.div`
  display: flex;

  h1:first-child {
    font-size: 5rem;
    color: #FFD400;
  }

  h1:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
  }

  h1:nth-child(3) {
    font-size: 4rem;
    font-weight: 700;
    width: 60rem;
  }

  h1:nth-child(4) {
    font-size: 3rem;
    width: 60rem;
    height: 10rem;
    word-break: break-all;
  }
`;

const Text = styled.div`
  margin-right: 3rem;
`;

const Image = styled.div`
  img {
    height: 20rem;
    width: 20rem;
    margin-right: 5rem;
  }
`;

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child{
    width: 6rem;
    height: 3rem;
    margin-right: 1rem;
    font-family:'Jua';
  }

  button:nth-child(2){
    width: 6rem;
    height:3rem;
    font-family:'Jua';
  }
`;

const Box = styled.div`
  border: solid 2px gray;
  padding: 3rem;
  width: 100rem;
`;

export default function Product() {
  const {
    register, handleSubmit, setValue, reset, formState: { errors },
  } = useForm();

  const [accessToken] = useLocalStorage('accessToken');

  const navigate = useNavigate();

  const shopStore = useShopStore();

  const [isPurchaseError, setPurchaseError] = useState(false);

  const [isCartError, setCartError] = useState(false);

  const [isSoldoutError, setSoldoutError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [, setName] = useLocalStorage('name');

  const [, setImage] = useLocalStorage('image');

  const [, setQuantity] = useLocalStorage('quantity');

  const [, setTotalPrice] = useLocalStorage('totalPrice');

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

    setImage(image);
    setName(name);
    setQuantity(quantity);
    setTotalPrice(totalPrice);

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
      reset();

      shopStore.imageUrl = '';

      shopStore.ratingValue = '';

      navigate('/login');

      return;
    }

    const foundOrder = orders.find(
      (order) => Number(order.productId) === Number(shopStore.productId),
    );

    if (!foundOrder) {
      alert('상품을 구매하지 않아 리뷰를 작성하실 수 없습니다.');

      reset();

      shopStore.imageUrl = '';

      shopStore.ratingValue = '';

      return;
    }

    const existingReview = reviews.find(
      (review) => Number(review.productId) === Number(shopStore.productId)
      && review.userId === userId,
    );

    if (existingReview) {
      alert('이미 리뷰를 작성하셨습니다.');

      reset();

      shopStore.imageUrl = '';

      shopStore.ratingValue = '';
      return;
    }

    const {
      title, content,
    } = data;

    const rating = shopStore.ratingValue;

    if (!rating) {
      alert('별점을 선택해주세요.');
      return;
    }

    const reviewImage = shopStore.imageUrl;

    await shopStore.registerReview({
      userId,
      productId,
      name,
      title,
      rating,
      content,
      reviewImage,
    });

    shopStore.fetchReviews();

    reset();

    shopStore.imageUrl = '';

    shopStore.ratingValue = '';
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

  const handleImageChange = async (e) => {
    await shopStore.uploadImage(e.target.files[0]);
  };

  const handleWriteButton = () => {
    // reset();

    // shopStore.imageUrl = '';
  };

  return (
    <div>
      <ProductContainer>
        <img src={shopStore.image} alt="상품 사진" style={{ width: '30rem', height: '30rem' }} />
        <ProductDetail>
          <h1>{shopStore.name}</h1>
          <h1>{shopStore.description}</h1>
          <h1>
            {numberFormat(shopStore.price)}
            원
          </h1>
          <hr />
          <Quantity>
            <p>구매 수량</p>
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
          </Quantity>
          <h2>
            TOTAL :
            {' '}
            {numberFormat(shopStore.totalPrice)}
            원
          </h2>
          <ButtonBox>
            <SubmitButton
              type="button"
              onClick={purchaseButtonClick}
            >
              구매하기
            </SubmitButton>
            <SubmitButton
              type="button"
              onClick={cartButtonClick}
            >
              장바구니에 담기
            </SubmitButton>
          </ButtonBox>
          {isSoldoutError
            ? (
              <ErrorText>품절 상품입니다. 빠른 시일 내에 재입고 될 수 있도록 하겠습니다.</ErrorText>
            ) : null}
          {isPurchaseError
            ? (
              <ErrorText>
                재고가 부족하여
                {' '}
                {shopStore.inventory}
                개까지만 주문가능합니다.
              </ErrorText>
            ) : null}
          {isCartError
            ? (
              <ErrorText>
                재고가 부족하여
                {' '}
                {shopStore.inventory}
                개까지만 장바구니에 담을 수 있습니다.
              </ErrorText>
            ) : null}
          {showModal ? <CartModal showModal={showModal} setShowModal={setShowModal} /> : null}
        </ProductDetail>
      </ProductContainer>
      <Title>Review</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Review>
          <ReviewText>
            <div>
              <label htmlFor="title">
                제목*
              </label>
              <br />
              <InputBox
                id="title"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('title', { required: true })}
              />
            </div>

            <div>
              <label htmlFor="rating">
                별점*
              </label>
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
            </div>
            <div>
              <label htmlFor="content">리뷰 내용*</label>
              <br />
              <textarea
                id="content"
                cols="49"
                rows="5"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('content', { required: true })}
              />
            </div>
            <SubmitButton type="submit" onClick={handleWriteButton}>WRITE</SubmitButton>
            <br />
            {errors.title ? (
              <ErrorText>제목을 입력해주세요.</ErrorText>
            ) : null}
            {errors.content ? (
              <ErrorText>리뷰 내용을 입력해주세요.</ErrorText>
            ) : null}
          </ReviewText>

          <ReviewImage>
            <div>
              <label htmlFor="image">리뷰 이미지 </label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <img src={shopStore.imageUrl} alt="" />

          </ReviewImage>

        </Review>

      </form>

      <Container>
        <ReviewContainer>
          {reviews.map((review) => (
            <div key={review.reviewId}>
              {Number(shopStore.productId) === Number(review.productId)
                ? (
                  <Box>
                    <UserReview>
                      <Image>
                        <img src={review.reviewImage} alt="리뷰 이미지" />
                      </Image>
                      <Text>
                        <h1>
                          {Array.from({ length: review.rating }, (_, index) => (
                            <span key={index} role="img" aria-label="star">
                              ★
                            </span>
                          ))}
                        </h1>
                        <h1>{review.userId}</h1>
                        <h1>{review.title}</h1>
                        <h1>
                          {review.content}
                        </h1>
                      </Text>
                    </UserReview>
                    {shopStore.userId === review.userId
                      ? (
                        <ButtonDiv>
                          <SubmitButton
                            type="button"
                            onClick={() => handleEditReview(review.reviewId)}
                          >
                            수정
                          </SubmitButton>
                          <SubmitButton
                            type="button"
                            onClick={() => handleDeleteReview(review.reviewId)}
                          >
                            삭제
                          </SubmitButton>
                        </ButtonDiv>
                      ) : null}
                  </Box>
                ) : null}
            </div>
          ))}
        </ReviewContainer>
      </Container>
    </div>
  );
}
