import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';

export default function AdminManagementUpdateForm() {
  const { register, handleSubmit, setValue } = useForm();

  const shopStore = useShopStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const id = window.location.pathname.split('/').pop();
      await shopStore.fetchProduct(id);

      const {
        name, description, image, price, quantity,
      } = shopStore;

      setValue('name', name);
      setValue('description', description);
      setValue('image', image);
      setValue('price', price);
      setValue('quantity', quantity);
    };
    fetchProduct();
  }, [shopStore, setValue]);

  const onSubmit = async (data) => {
    const {
      name, description, image, price, quantity,
    } = data;

    const id = window.location.pathname.split('/').pop();

    await shopStore.updateProduct({
      id, name, description, image, price, quantity,
    });

    navigate('/admin/management');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>상품 수정</h1>
        <div>
          <label htmlFor="input-product-name">상품 이름</label>
          <input
            id="input-product-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-description">상품 설명</label>
          <input
            id="input-product-description"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('description', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-image">상품 이미지</label>
          <input
            id="input-product-image"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('image', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-price">상품 가격</label>
          <input
            id="input-product-price"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('price', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-quantity">상품 수량</label>
          <input
            id="input-product-quantity"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('quantity', { required: true })}
          />
        </div>
        <button type="submit">상품 수정</button>
      </form>
    </div>
  );
}
