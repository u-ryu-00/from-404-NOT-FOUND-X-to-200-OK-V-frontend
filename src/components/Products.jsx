import { Link } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';

import numberFormat from '../utils/numberFormat';

export default function Products() {
  const shopStore = useShopStore();

  const { products } = shopStore;

  return (
    <div>
      <p>Shop</p>
      {(!products.length) ? (
        <p>상품이 존재하지 않습니다.</p>
      )
        : null}
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <img src={product.image} alt="상품 사진" style={{ width: '28rem', height: '28rem' }} />
          <h1>{product.name}</h1>
          <h1>
            {numberFormat(product.price)}
            원
          </h1>
        </Link>
      ))}
    </div>
  );
}
