import { Link } from 'react-router-dom';
import styled from 'styled-components';
import KakaoLogo from '../../img/kakao_login_medium_wide.png';

const Text = styled.p`
  font-family : 'Poor Story';
  display: flex;
  justify-content: center;
  width: 40rem;
  height: 5rem;
  align-items: center;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 40rem;
  height: 5rem;
  align-items: center;
  margin-bottom: 4rem;
`;

export default function KakaoLogin() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <>
      <Text>SNS 계정으로 로그인</Text>
      <StyledLink to={KAKAO_AUTH_URI}>
        <img src={KakaoLogo} alt="카카오로고" />
      </StyledLink>
    </>
  );
}
