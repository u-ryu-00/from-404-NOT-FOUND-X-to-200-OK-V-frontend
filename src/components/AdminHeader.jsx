import { Link } from 'react-router-dom';

export default function AdminHeader() {
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
            로그아웃
          </li>
          <hr />
        </ul>
      </nav>
    </header>
  );
}
