import useShopStore from '../hooks/useShopStore';
import numberFormat from '../utils/numberFormat';

export default function Account() {
  const shopStore = useShopStore();

  return (
    <div>
      내 잔액:
      {' '}
      {numberFormat(shopStore.amount)}
      원
    </div>
  );
}
