import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useShopStore from '../hooks/useShopStore';

export default function EditReviewForm() {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const shopStore = useShopStore();

  useEffect(() => {
    const fetchReview = async () => {
      const id = window.location.pathname.split('/').splice(2, 1)[0];

      await shopStore.fetchReview(id);

      const { title, rating, content } = shopStore;
      setValue('title', title);
      setValue('rating', rating);
      setValue('content', content);
    };

    fetchReview();
  }, [setValue]);

  const onSubmit = async (data) => {
    const {
      title, rating, content,
    } = data;

    const id = window.location.pathname.split('/').splice(2, 1);

    await shopStore.updateReview({
      id, title, rating, content,
    });

    navigate(`/products/${shopStore.productId}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>리뷰 수정</p>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="rating">별점</label>
          <input
            id="rating"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('rating', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="content">리뷰 내용</label>
          <input
            id="content"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('content', { required: true })}
          />
        </div>
        <button type="submit">WRITE</button>
      </form>
    </div>
  );
}
