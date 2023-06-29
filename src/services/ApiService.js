/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async postSession({ userId, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userId, password });
    return {
      accessToken: data.accessToken,
      name: data.name,
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

  async fetchProducts() {
    const url = `${baseUrl}/products`;
    const { data } = await axios.get(url);
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

  async requestOrder({
    productId, name, description, image, price, quantity,
  }) {
    const url = `${baseUrl}/orders`;
    await axios.post(url, {
      productId,
      name,
      description,
      image,
      price,
      quantity,
    });
  }
}

export const apiService = new ApiService();
