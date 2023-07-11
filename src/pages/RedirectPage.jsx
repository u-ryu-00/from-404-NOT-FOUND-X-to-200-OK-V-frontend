import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { apiService } from '../services/ApiService';
import { shopStore } from '../stores/ShopStore';

export default function RedirectPage() {
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    (async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');

        const accessToken = await shopStore.kakaoLogin(code);

        setAccessToken(accessToken);

        apiService.setAccessToken(accessToken);

        navigate('/');
      } catch (e) {
        navigate('/');
      }
    })();
  }, []);

  return <div>Redirect Page</div>;
}
