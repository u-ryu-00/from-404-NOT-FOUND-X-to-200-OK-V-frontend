import { useEffect } from 'react';
import AdminManagementUpdateForm from '../components/AdminManagementUpdateForm';
import useShopStore from '../hooks/useShopStore';

export default function AdminManagementUpdatePage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchProducts();
  }, []);

  return (
    <div>
      <AdminManagementUpdateForm />
    </div>
  );
}
