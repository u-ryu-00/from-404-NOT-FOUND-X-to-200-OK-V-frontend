import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';

export default function Account() {
  const shopStore = useShopStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (accessToken) {
      shopStore.fetchAccount();
    }
  }, []);

  return (
    <div>
      내 잔액:
      {' '}
      {numberFormat(shopStore.amount)}
      원
    </div>
  );
}
