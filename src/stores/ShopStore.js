import { apiService } from '../services/ApiService';

export default class ShopStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
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
}

export const shopStore = new ShopStore();
