import { useNavigate } from 'react-router-dom';

export default function SignupCompletePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <p>회원가입 완료</p>
      <p>회원가입이 완료되었습니다.</p>
      <p>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</p>
      <button type="button" onClick={handleLogin}>로그인하기</button>
    </div>
  );
}
