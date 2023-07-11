import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Account from './Account';

const StyledNavLink = styled(NavLink)`
  position: relative;

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.3rem;
    background-color: #22DAAB
  }
`;

export default function Header() {
  const navigate = useNavigate();

  const shopStore = useShopStore();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setUserId] = useLocalStorage('userId', '');
  const [, setPassword] = useLocalStorage('password', '');

  useEffect(() => {
    if (accessToken) {
      shopStore.fetchAccount();
    }
  }, []);

  const handleLogout = () => {
    setAccessToken('');
    setUserId('');
    setPassword('');

    navigate('/');
  };

  return (
    <header>
      <ul>
        <li>
          <StyledNavLink to="/" activeclassname="active">Home</StyledNavLink>
        </li>
        <li>
          <NavLink to="/products">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
      </ul>
      <ul>
        {accessToken ? (
          <>
            <li>
              <Account />
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>로그아웃</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Join us</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
