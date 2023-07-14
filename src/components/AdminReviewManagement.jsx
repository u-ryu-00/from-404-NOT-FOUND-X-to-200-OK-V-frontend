import useShopStore from '../hooks/useShopStore';

export default function AdminReviewManagement() {
  const shopStore = useShopStore();

  const { reviews } = shopStore;

  const handleDeleteReview = async (reviewId) => {
    await shopStore.deleteReview(reviewId);
  };

  return (
    <div>
      <p>리뷰 관리</p>
      <hr />
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
            리뷰 제목:
            {' '}
            {review.title}
          </h1>
          <h1>
            별점:
            {' '}
            {review.rating}
          </h1>
          <h1>
            리뷰 내용:
            {' '}
            {review.content}
          </h1>
          <button
            type="button"
            onClick={() => handleDeleteReview(review.reviewId)}
          >
            해당 리뷰 삭제
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
