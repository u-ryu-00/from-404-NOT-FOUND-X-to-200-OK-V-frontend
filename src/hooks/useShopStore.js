import { useEffect } from 'react';

import useForceUpdate from './useForceUpdate';

import { shopStore } from '../stores/ShopStore';

export default function useShopStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    shopStore.subscribe(forceUpdate);

    return () => shopStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return shopStore;
}
