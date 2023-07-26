import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import SubmitButton from './ui/SubmitButton';
import Title from './ui/Title';
import InputBox from './ui/InputBox';

const Container = styled.div`
  display: flex;
  justify-content: center;
  
  button {
    margin-top: 3rem;
  }

  img {
    height: 40rem;
    width: 40rem;
  }
`;

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
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>상품 등록</Title>
        <div>
          <label htmlFor="input-product-name">상품 이름 : </label>
          <br />
          <InputBox
            id="input-product-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-description">상품 설명 : </label>
          <br />
          <InputBox
            id="input-product-description"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('description', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-image">상품 이미지 </label>
          <input
            id="input-product-image"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <img src={shopStore.imageUrl} alt="" />
        <div>
          <label htmlFor="input-product-price">상품 가격 : </label>
          <br />
          <InputBox
            id="input-product-price"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('price', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-product-inventory">상품 수량 : </label>
          <br />
          <InputBox
            id="input-product-inventory"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('inventory', { required: true })}
          />
        </div>
        <SubmitButton type="submit">상품 등록</SubmitButton>
      </form>
    </Container>
  );
}
