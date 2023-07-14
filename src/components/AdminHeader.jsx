import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

export default function AdminHeader() {
  const navigate = useNavigate();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setUserId] = useLocalStorage('userId', '');
  const [, setPassword] = useLocalStorage('password');

  const handleLogout = () => {
    setAccessToken('');
    setUserId('');
    setPassword('');

    navigate('/');
  };

  return (
    <header>
      <nav>
        <ul>
          <hr />
          <li>
            관리자님이 로그인 중입니다.
          </li>
          <li>
            <Link to="/admin">홈</Link>
          </li>
          <li>
            <Link to="/admin/registration">상품 등록</Link>
          </li>
          <li>
            <Link to="/admin/management">상품 관리</Link>
          </li>
          <li>
            <Link to="/admin/review">리뷰 관리</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>로그아웃</Link>
          </li>
          <hr />
        </ul>
      </nav>
    </header>
  );
}
