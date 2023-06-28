import { apiService } from '../services/ApiService';

export default class ShopStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.productId = 0;
    this.description = '';
    this.image = '';
    this.price = 0;
    this.quantity = 0;

    this.registerProductState = '';
    this.deleteProductState = '';

    this.products = [];
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async login({ userId, password }) {
    try {
      const { accessToken, name } = await apiService.postSession({
        userId, password,
      });

      this.name = name;

      return accessToken;
    } catch (e) {
      return '';
    }
  }

  async registerProduct({
    name, description, image, price, quantity,
  }) {
    this.changeRegisterProductState('processing');
    try {
      await apiService.registerProduct({
        name, description, image, price, quantity,
      });
      this.changeRegisterProductState('success');
    } catch (e) {
      this.changeRegisterProductState('fail');
    }
  }

  changeRegisterProductState(state) {
    this.registerProductState = state;
    this.publish();
  }

  async fetchProducts() {
    const data = await apiService.fetchProducts();
    this.products = data.products;

    this.publish();
  }

  async fetchProduct(id) {
    const {
      productId, name, description, image, price, quantity,
    } = await apiService.fetchProduct(id);

    this.productId = productId;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;

    this.publish();
  }

  async updateProduct({
    id, name, description, image, price, quantity,
  }) {
    this.changeUpdateProductState('processing');
    try {
      await apiService.updateProduct({
        id, name, description, image, price, quantity,
      });
      this.changeUpdateProductState('success');
    } catch (e) {
      this.changeUpdateProductState('fail');
    }
  }

  changeUpdateProductState(state) {
    this.updateProductState = state;
    this.publish();
  }

  async deleteProduct(id) {
    this.changeDeleteProductState('processing');
    try {
      await apiService.deleteProduct(id);
      this.changeDeleteProductState('success');
      this.fetchProducts();
    } catch (e) {
      this.changeDeleteProductState('fail');
    }
  }

  changeDeleteProductState(state) {
    this.deleteProductState = state;
    this.publish();
  }
}

export const shopStore = new ShopStore();
