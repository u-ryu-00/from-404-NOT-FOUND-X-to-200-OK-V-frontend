import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Title from './ui/Title';
import SubmitButton from './ui/SubmitButton';
import InputBox from './ui/InputBox';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  div:nth-child(3){
    display: flex;
    justify-content: flex-start;
    width: 40rem;
    margin: 2rem 0;
  }

  button {
    margin: 3rem 0;
  }
`;

const Textarea = styled.textarea`
    border: 1px solid rgb(216, 216, 216);
    color: rgb(160, 160, 160);
    width: 40rem;
    padding: 1rem;
    height: 16rem;
    margin: 1rem 0 3.5rem 0; 
`;

export default function EditReviewForm() {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const shopStore = useShopStore();

  useEffect(() => {
    const fetchReview = async () => {
      const id = window.location.pathname.split('/').splice(2, 1)[0];

      await shopStore.fetchReview(id);

      const { title, content, reviewImage } = shopStore;
      setValue('title', title);
      setValue('content', content);
      setValue('reviewImage', reviewImage);
    };

    fetchReview();
  }, [setValue]);

  const onSubmit = async (data) => {
    const {
      title, content, reviewImage,
    } = data;

    const rating = shopStore.ratingValue;

    if (!rating) {
      alert('별점을 선택해주세요.');
      return;
    }

    const id = window.location.pathname.split('/').splice(2, 1);

    await shopStore.updateReview({
      id, title, rating, content, reviewImage,
    });

    navigate(`/products/${shopStore.productId}`);
  };

  const handleRatingChange = (event) => {
    const selectedRating = event.target.value;
    setValue('rating', selectedRating);
    shopStore.setRating(selectedRating);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Edit Review</Title>
        <div>
          <label htmlFor="title">제목 :</label>
          <br />
          <InputBox
            id="title"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="rating">별점</label>
          <label>
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={handleRatingChange}
              checked={shopStore.ratingValue === '5'}
            />
            ★★★★★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={handleRatingChange}
              checked={shopStore.ratingValue === '4'}
            />
            ★★★★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={handleRatingChange}
              checked={shopStore.ratingValue === '3'}
            />
            ★★★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={handleRatingChange}
              checked={shopStore.ratingValue === '2'}
            />
            ★★
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={handleRatingChange}
              checked={shopStore.ratingValue === '1'}
            />
            ★
          </label>
        </div>
        <div>
          <label htmlFor="content">리뷰 내용 :</label>
          <br />
          <Textarea
            id="content"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('content', { required: true })}
          />
          <div>
            <label htmlFor="reviewImage">리뷰 이미지: </label>
            <br />
            <InputBox
              id="reviewImage"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('reviewImage', { required: true })}
            />
          </div>
        </div>
        <SubmitButton type="submit">WRITE</SubmitButton>
      </Form>
    </div>
  );
}
