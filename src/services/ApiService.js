/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    // this.accessToken = window.localStorage.getItem('token') || '';
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postSession({ userId, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userId, password });
    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async signup({
    name, userId, password, confirmPassword,
  }) {
    const url = `${baseUrl}/accounts`;
    const { data } = await axios.post(url, {
      name, userId, password, confirmPassword,
    });
    return {
      accessToken: data.accessToken,
      amount: data.amount,
    };
  }

  async fetchAccount() {
    const url = `${baseUrl}/accounts/me`;
    const { data } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
    return {
      name: data.name,
      userId: data.userId,
      amount: data.amount,
    };
  }

  async registerProduct({
    name, description, image, price, inventory,
  }) {
    const url = `${baseUrl}/admin/products`;
    await axios.post(url, {
      name, description, image, price, inventory,
    });
  }

  async fetchProducts(pageNumber) {
    const url = `${baseUrl}/products`;

    const { data } = await axios.get(url, {
      params: {
        page: pageNumber,
      },
    });

    return data;
  }

  async fetchProduct(id) {
    const url = `${baseUrl}/products/${id}`;
    const { data } = await axios.get(url);

    return {
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      inventory: data.inventory,
    };
  }

  async updateProduct({
    id, name, description, image, price, inventory,
  }) {
    const url = `${baseUrl}/products/${id}`;
    await axios.patch(url, {
      name, description, image, price, inventory,
    });
  }

  async deleteProduct(id) {
    const url = `${baseUrl}/products/${id}`;
    await axios.delete(url);
  }

  async fetchOrders(pageNumber) {
    const url = `${baseUrl}/orders`;
    const { data } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        page: pageNumber,
      },
    });

    return data;
  }

  async requestOrder({
    userId, productId, name, description, image, price, inventory, quantity,
    receiver, address, phoneNumber, deliveryMessage,
  }) {
    const url = `${baseUrl}/orders`;
    await axios.post(url, {
      userId,
      productId,
      name,
      description,
      image,
      price,
      inventory,
      quantity,
      receiver,
      address,
      phoneNumber,
      deliveryMessage,
    }, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async fetchOrder(id) {
    const url = `${baseUrl}/orders/${id}`;
    const { data } = await axios.get(url);

    return {
      orderId: data.orderId,
      productId: data.productId,
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      inventory: data.inventory,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
      receiver: data.receiver,
      address: data.address,
      phoneNumber: data.phoneNumber,
      deliveryMessage: data.deliveryMessage,
      createdAt: data.createdAt,
    };
  }
}

export const apiService = new ApiService();
