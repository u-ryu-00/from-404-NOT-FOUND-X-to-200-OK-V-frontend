import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

export default function AdminHeader() {
  const navigate = useNavigate();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setUserId] = useLocalStorage('userId', '');
  const [, setPassword] = useLocalStorage('password');

  const Container = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6.4rem;
  `;

  const Menu = styled.ul`
    display: flex;
    margin-left: 4rem;
    justify-content: space-around;
    width: 70rem;
    font-size: 3rem;
    font-weight: 700;
  `;

  const Text = styled.ul`
    margin-right: 4rem;
  `;

  const handleLogout = () => {
    setAccessToken('');
    setUserId('');
    setPassword('');

    navigate('/');
  };

  return (
    <header>
      <nav>
        <Container>
          <Menu>
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
          </Menu>
          <Text>
            <li>
              관리자님이 로그인 중입니다.
            </li>
          </Text>
        </Container>
      </nav>
    </header>
  );
}
