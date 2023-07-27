import styled from 'styled-components';

const CancelMessage = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export default function PayCancelPage() {
  return (
    <CancelMessage>카카오 페이 결제를 취소하셨습니다.</CancelMessage>
  );
}
