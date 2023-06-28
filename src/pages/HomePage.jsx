import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import MainBanner from '../../img/MainBanner.png';

const Logo = styled.img`
  width: 126rem;
  height: 40rem;
  background-image: url(${MainBanner});
`;

export default function HomePage() {
  const navigate = useNavigate();

  const shopMoreButtonClick = () => {
    navigate('/products');
  };

  return (
    <div>
      <Logo />
      <h1>Shop</h1>
      <button type="button" onClick={shopMoreButtonClick}>SHOP MORE</button>
    </div>
  );
}
