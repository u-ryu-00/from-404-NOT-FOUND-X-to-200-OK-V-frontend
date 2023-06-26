import { Reset } from 'styled-reset';

import { Route, Routes } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';

import HomePage from './pages/HomePage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupCompletePage from './pages/SignupCompletePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/Cartpage';
import OrderPage from './pages/OrderPage';
import OrderListPage from './pages/OrderListPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import AdminManagementPage from './pages/AdminManagementPage';

export default function App() {
  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupComplete" element={<SignupCompletePage />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/products/{id}" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orderList" element={<OrderListPage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/registration" element={<AdminRegistrationPage />} />
        <Route path="/admin/management" element={<AdminManagementPage />} />
      </Routes>
    </div>
  );
}
