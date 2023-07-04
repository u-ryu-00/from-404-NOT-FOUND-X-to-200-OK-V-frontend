import ShopStore from './ShopStore';

const context = describe;

describe('ShopStore', () => {
  let shopStore;

  beforeEach(() => {
    shopStore = new ShopStore();
  });

  describe('login', () => {
    context('with correct userId and password', () => {
      it('loads userId information', async () => {
        await shopStore.login({ userId: 'a111', password: 'Aa1!!!!!' });
      });
    });

    context('with incorrect userId', () => {
      it('loads userId information', async () => {
        await shopStore.login({ userId: 'xxx', password: 'Aa1!!!!!' });
      });
    });
  });

  describe('fetchAccount', () => {
    it('sets account information', async () => {
      await shopStore.fetchAccount();

      expect(shopStore.userId).toBe('a111');
      expect(shopStore.amount).toBe(500_000);
    });
  });

  describe('fetchProduct', () => {
    it('loads product information', async () => {
      await shopStore.fetchProduct(2);

      expect(shopStore.name).toBe('거북이 인형');
      expect(shopStore.description).toBe('귀여운 사이즈의 거북이 인형입니다!');
    });
  });

  describe('fetchOrder', () => {
    it('loads order information', async () => {
      await shopStore.fetchOrder(1);

      expect(shopStore.orderId).toBe(1);
      expect(shopStore.quantity).toBe(1);
      expect(shopStore.name).toBe('소음이 적은 레이저 기계식 키보드');
    });
  });
});
