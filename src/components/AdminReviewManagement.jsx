import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Title from './ui/Title';
import SubmitButton from './ui/SubmitButton';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Review = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100rem;
  gap: 10rem;

  button {
    display: flex;
    width: 15rem;
    font-size: 1.5rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function AdminReviewManagement() {
  const shopStore = useShopStore();

  const { reviews } = shopStore;

  const handleDeleteReview = async (reviewId) => {
    await shopStore.deleteReview(reviewId);
  };

  return (
    <div>
      <Title>리뷰 관리</Title>
      <Container>
        <Review>
          {reviews.map((review) => (
            <div key={review.reviewId}>
              <h1>
                유저아이디 :
                {' '}
                {review.userId}
              </h1>
              <h1>
                상품아이디 :
                {' '}
                {review.productId}
              </h1>
              <h1>
                상품이름 :
                {' '}
                {review.name}
              </h1>
              <h1>
                리뷰 제목 :
                {' '}
                {review.title}
              </h1>
              <h1>
                별점 :
                {' '}
                {review.rating}
              </h1>
              <h1>
                리뷰 내용 :
                {' '}
                {review.content}
              </h1>
              <ButtonBox>
                <SubmitButton
                  type="button"
                  onClick={() => handleDeleteReview(review.reviewId)}
                >
                  해당 리뷰 삭제
                </SubmitButton>
              </ButtonBox>
            </div>
          ))}
        </Review>
      </Container>
    </div>
  );
}
