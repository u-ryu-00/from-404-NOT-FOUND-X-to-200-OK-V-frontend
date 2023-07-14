import { useEffect } from 'react';
import useShopStore from '../hooks/useShopStore';
import EditReviewForm from '../components/EditReviewForm';

export default function EditReviewPage() {
  const shopStore = useShopStore();

  useEffect(() => {
    shopStore.fetchReviews();
  }, []);

  return (
    <div>
      <EditReviewForm />
    </div>
  );
}
