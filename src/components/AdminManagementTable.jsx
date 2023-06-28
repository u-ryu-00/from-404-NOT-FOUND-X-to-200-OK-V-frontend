import { useNavigate } from 'react-router-dom';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';

export default function AdminManagementTable() {
  const shopStore = useShopStore();

  const { products } = shopStore;

  const navigate = useNavigate();

  const handleEditProduct = (productId) => {
    navigate(`/admin/management/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    await shopStore.deleteProduct(productId);
  };

  return (
    <div>
      <p>상품 관리</p>
      <hr />
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <h1>{product.description}</h1>
          <img src={product.image} alt="상품 사진" style={{ width: '28rem', height: '28rem' }} />
          <h1>{numberFormat(product.price)}</h1>
          <h1>{product.quantity}</h1>
          <button
            type="button"
            onClick={() => handleEditProduct(product.id)}
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => handleDeleteProduct(product.id)}
          >
            삭제
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
