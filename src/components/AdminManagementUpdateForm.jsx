import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Title from './ui/Title';
import SubmitButton from './ui/SubmitButton';
import InputBox from './ui/InputBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 3rem;
  }
`;

export default function AdminManagementUpdateForm() {
  const { register, handleSubmit, setValue } = useForm();

  const shopStore = useShopStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const id = window.location.pathname.split('/').pop();
      await shopStore.fetchProduct(id);

      const {
        name, description, image, price, inventory,
      } = shopStore;

      setValue('name', name);
      setValue('description', description);
      setValue('image', image);
      setValue('price', price);
      setValue('inventory', inventory);
    };
    fetchProduct();
  }, [shopStore, setValue]);

  const onSubmit = async (data) => {
    const {
      name, description, image, price, inventory,
    } = data;

    const id = window.location.pathname.split('/').pop();

    await shopStore.updateProduct({
      id, name, description, image, price, inventory,
    });

    navigate('/admin/management');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>상품 수정</Title>
        <Container>
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
            <label htmlFor="input-product-image">상품 이미지 : </label>
            <br />
            <InputBox
              id="input-product-image"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('image', { required: true })}
            />
          </div>
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
          <SubmitButton type="submit">상품 수정</SubmitButton>
        </Container>
      </form>
    </div>
  );
}
