import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../components/ui/SubmitButton';
import Title from '../components/ui/Title';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 5rem;
  }
`;
export default function SignupCompletePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Title>Your account is set up</Title>
      <h2>회원가입이 완료되었습니다.</h2>
      <h2>서비스 이용을 위해 로그인을 진행해주세요.</h2>
      <SubmitButton type="button" onClick={handleLogin}>Log in</SubmitButton>
    </Container>
  );
}
