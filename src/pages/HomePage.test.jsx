import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: jest.fn().mockImplementation(({ children, to }) => (
    <a href={to}>{children}</a>
  )),
  useNavigate: () => navigate,
}));

test('AdminRegistrationForm', () => {
  render((
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  ));

  fireEvent.click(screen.getByText(/SHOP MORE/));

  expect(navigate).toBeCalledWith('/products');
});
