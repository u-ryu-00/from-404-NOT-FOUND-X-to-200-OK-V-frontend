import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/* 모달창을 화면 중앙. 최상단에 노출 */
const Modal = styled.div`
  /* 모달창 크기 */
  width: 300px;
  height: 200px;

  /* 최상단 위치 */
  z-index: 999;
  
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;

/* 모달창 내부 X버튼 */
const Close = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export default function CartModal({ setShowModal }) {
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
    <Modal>
      <Close onClick={closeModal}>x</Close>
      <p>장바구니 담기</p>
      <p>장바구니에 상품이 정상적으로 담겼습니다.</p>
      <button type="button" onClick={cartButtonClick}>장바구니 이동</button>
      <button type="button" onClick={shoppingButtonClick}>쇼핑 계속하기</button>
    </Modal>
  );
}
