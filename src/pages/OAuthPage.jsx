import { useEffect } from 'react';

export default function OAuthPage() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const KAKAO_AUTH_URI2 = 'https://kauth.kakao.com/oauth/authorize?client_id=1a5869ccdb09fac73f251a4277773391&redirect_uri=http://localhost:8080/redirect&response_type=code';

  useEffect(() => {
    window.location.href = KAKAO_AUTH_URI2;
    console.log('계속 로딩중');
  }, []);

  // const code = new URL(window.location.href).searchParams.get('code');
  // console.log(code);

  return (
    <p>카카오톡 로그인 처리 중...</p>
  );
}
