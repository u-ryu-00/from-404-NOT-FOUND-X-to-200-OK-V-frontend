import { Reset } from 'styled-reset';

import { Route, Routes } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
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
import OrdersPage from './pages/OrdersPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import AdminManagementPage from './pages/AdminManagementPage';
import AdminHeader from './components/AdminHeader';
import AdminManagementUpdatePage from './pages/AdminManagementUpdatePage';
import { apiService } from './services/ApiService';
import OrderDetailPage from './pages/OrderDetailPage';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Header />
      <AdminHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/registration" element={<AdminRegistrationPage />} />
        <Route path="/admin/management" element={<AdminManagementPage />} />
        <Route path="/admin/management/:id" element={<AdminManagementUpdatePage />} />
      </Routes>
    </div>
  );
}
