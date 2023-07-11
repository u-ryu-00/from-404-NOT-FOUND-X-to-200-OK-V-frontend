import { Link } from 'react-router-dom';
import KakaoLogo from '../../img/kakao_login_button.png';

export default function KakaoLogin() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <>
      <p>SNS 계정으로 로그인</p>
      <Link to={KAKAO_AUTH_URI}>
        <img src={KakaoLogo} alt="카카오로고" />
      </Link>
    </>
  );
}
