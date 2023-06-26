import server from '../testServer';

import ShopStore from './ShopStore';

const context = describe;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('ShopStore', () => {
  let shopStore;

  beforeEach(() => {
    shopStore = new ShopStore();
  });

  describe('login', () => {
    context('with correct userId and password', () => {
      it('loads userId information', async () => {
        await shopStore.login({ userId: 'a111', password: 'Aa1!!!!!' });

        expect(shopStore.name).toBe('내이름');
      });
    });

    context('with incorrect userId', () => {
      it('loads userId information', async () => {
        await shopStore.login({ userId: 'xxx', password: 'Aa1!!!!!' });
      });
    });
  });
});
