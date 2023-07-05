import { useNavigate } from 'react-router-dom';
import KakaoLogo from '../../img/kakao_login_button.png';

export default function KakaoLogin() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/oauth');
  };

  return (
    <>
      <p>SNS 계정으로 로그인</p>
      <button type="button" onClick={handleClick}>
        <img src={KakaoLogo} alt="카카오로고" />
      </button>
    </>
  );
}
