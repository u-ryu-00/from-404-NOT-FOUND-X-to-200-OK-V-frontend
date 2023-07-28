import { NavLink } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';

const StyledNavLink = styled(NavLink)`
  background: #FFCACC;
  background: linear-gradient(0deg,  rgb(0,172,238) 0%,  rgb(0,172,238) 100%);
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  ::before::after{
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    background:  rgb(0,172,238);
    transition: all 0.3s ease;
  }

  :before {
    height: 0%;
    width: 2px;
  }

  :after {
    width: 0%;
    height: 2px;
  }

  :hover{
    background: transparent;
    box-shadow: none;
  }

  :hover:before {
    height: 100%;
  }

  :hover:after {
    width: 100%;
  }

  span:hover{
    color:  rgb(0,172,238);
  }

  span:before,
  span:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    background:  rgb(0,172,238);
    transition: all 0.3s ease;
  }

  span:before {
    width: 2px;
    height: 0%;
  }

  span:after {
    width: 0%;
    height: 2px;
  }

  :hover:before {
    height: 100%;
  }

  span:hover:after {
    width: 100%;
  }
`;

const F4T2Link = styled(NavLink)`
  background: #FFCACC;
  background: linear-gradient(0deg,  rgb(0,172,238) 0%,  rgb(0,172,238) 100%);
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  font-size: 3rem;
  background-color: #AEDEFC;
  color: #FFFFFF;
  li:first-child {
     margin-left: 4rem;
  }
`;

const Menu = styled.ul`
  display:flex;
  align-items: center;
  li {
    margin-left: 4rem; 
  }
  margin-right: 4rem;
`;

const Marquee = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #0056a8;
  overflow: hidden;
  position: relative;
  color: #FFFFFF;
  font-family: 'Waiting for the Sunrise';

  div {
    display: block;
    width: 200%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    margin: 1rem 1rem 1rem 1rem;
    animation: marquee 18s linear infinite;
  }

  span {
    font-size: 2rem;
  }

  @keyframes marquee {
    0% { left: 100%; }
    100% { left: -50%; }
}
`;

export default function Header() {
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

    window.location.href = '/';
  };

  return (
    <>
      <Marquee>
        <div>
          <span>
            👾 F4T2 👾
            {' '}
            from 404 NOT FOUND X to 200 OK V
            {' '}
            👾 F4T2 👾
            {' '}
          </span>
        </div>
      </Marquee>
      <Container>
        <li>
          <F4T2Link to="/"><span>F4T2</span></F4T2Link>
        </li>
        <Menu>
          <li>
            <StyledNavLink to="/" activeclassname="active"><span>Home</span></StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/products"><span>Shop</span></StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/cart"><span>Cart</span></StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/orders"><span>Orders</span></StyledNavLink>
          </li>
          <li>
            <span>|</span>
          </li>
          {accessToken ? (
            <li>
              <StyledNavLink to="/" onClick={handleLogout}><span>Log out</span></StyledNavLink>
            </li>
          ) : (
            <>
              <li>
                <StyledNavLink to="/login"><span>Log in</span></StyledNavLink>
              </li>
              <li>
                <StyledNavLink to="/signup"><span>Join us</span></StyledNavLink>
              </li>
            </>
          )}
        </Menu>
      </Container>
    </>
  );
}
