import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: jest.fn().mockImplementation(({ children, to }) => (
    <a href={to}>{children}</a>
  )),
  useNavigate: () => navigate,
}));

describe('Header', () => {
  function renderHeader() {
    render((
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ));
  }

  it('renders "Home" link', () => {
    renderHeader();

    screen.getByText(/Home/);
  });

  context('without logged in', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('renders "로그인" button', () => {
      renderHeader();

      screen.getByText(/Log in/);
    });
  });

  context('with logged in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('renders "로그아웃" button', () => {
      renderHeader();

      fireEvent.click(screen.getByText(/로그아웃/));

      expect(navigate).toBeCalledWith('/');
    });
  });
});
