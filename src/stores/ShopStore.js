import { apiService } from '../services/ApiService';

export default class ShopStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.productId = 0;
    this.description = '';
    this.image = '';
    this.price = 0;
    this.inventory = 0;

    this.quantity = 1;
    this.totalPrice = 0;

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
    name, description, image, price, inventory,
  }) {
    this.changeRegisterProductState('processing');
    try {
      await apiService.registerProduct({
        name, description, image, price, inventory,
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

  async fetchProducts(pageNumber) {
    const data = await apiService.fetchProducts(pageNumber);
    this.products = data.products;
    this.totalPages = data.totalPages;

    this.publish();
  }

  async fetchProduct(id) {
    const {
      productId, name, description, image, price, inventory,
    } = await apiService.fetchProduct(id);

    this.productId = productId;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.inventory = inventory;

    this.totalPrice = this.price * this.quantity;

    this.publish();
  }

  plusQuantityAndTotalPrice() {
    this.quantity += 1;
    this.totalPrice = this.price * this.quantity;

    this.publish();
  }

  minusQuantityAndTotalPrice() {
    this.quantity -= 1;
    this.totalPrice = this.price * this.quantity;

    this.publish();
  }

  resetQuantity() {
    this.quantity = 1;

    this.publish();
  }

  async updateProduct({
    id, name, description, image, price, inventory,
  }) {
    this.changeUpdateProductState('processing');
    try {
      await apiService.updateProduct({
        id, name, description, image, price, inventory,
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

  async requestOrder({
    productId,
    name,
    description,
    image,
    price,
    quantity,
  }) {
    this.changeOrderState('processing');
    try {
      await apiService.requestOrder({
        productId,
        name,
        description,
        image,
        price,
        quantity,
      });
      this.changeOrderState('success');
    } catch (e) {
      this.changeOrderState('fail');
    }
  }

  changeOrderState(state) {
    this.orderState = state;

    this.publish();
  }
}

export const shopStore = new ShopStore();
