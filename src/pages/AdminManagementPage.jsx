import { useEffect } from 'react';
import AdminManagementTable from '../components/AdminManagementTable';
import useShopStore from '../hooks/useShopStore';

export default function AdminManagementPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchProducts();
  }, []);

  return (
    <div>
      <AdminManagementTable />
    </div>
  );
}
