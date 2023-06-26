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
});
