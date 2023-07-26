import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from './ui/SubmitButton';

const Modal = styled.div`
  width: 300px;
  height: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0056a8; 
  color: white; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  button {
    background-color: #E66826;
    width: 20rem;
    font-family: 'Jua';
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998; 
`;

export default function CartModal({ showModal, setShowModal }) {
  const navigate = useNavigate();

  const cartButtonClick = () => {
    navigate('/cart');
  };

  const shoppingButtonClick = () => {
    navigate('/products');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    showModal && (
      <ModalOverlay>
        <Modal>
          <Close onClick={closeModal}>x</Close>
          <p>장바구니 담기</p>
          <p>장바구니에 상품이 정상적으로 담겼습니다.</p>
          <ButtonBox>
            <SubmitButton type="button" onClick={cartButtonClick}>장바구니 이동</SubmitButton>
            <SubmitButton type="button" onClick={shoppingButtonClick}>쇼핑 계속하기</SubmitButton>
          </ButtonBox>
        </Modal>
      </ModalOverlay>
    )
  );
}
