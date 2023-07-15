import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';

export default function AdminRegistrationForm() {
  const { register, handleSubmit } = useForm();

  const shopStore = useShopStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const image = shopStore.imageUrl;

    const {
      name, description, price, inventory,
    } = data;

    await shopStore.registerProduct({
      name, description, image, price, inventory,
    });

    shopStore.imageUrl = '';

    navigate('/admin/management');
  };

  const handleImageChange = async (e) => {
    await shopStore.uploadImage(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>상품 등록</h1>
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
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <img src={shopStore.imageUrl} alt="이미지" />
        <div>
          <label htmlFor="input-product-price">상품 가격</label>
          <input
            id="input-product-price"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('price', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-inventory">상품 수량</label>
          <input
            id="input-product-inventory"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('inventory', { required: true })}
          />
        </div>
        <button type="submit">상품 등록</button>
      </form>
    </div>
  );
}
