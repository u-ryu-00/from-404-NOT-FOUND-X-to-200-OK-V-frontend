/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

const { cloudinaryName, cloudinaryKey } = config;

export default class ApiService {
  constructor() {
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

  async kakaoLogin(code) {
    try {
      const url = `${baseUrl}/accounts/auth`;

      const response = await axios.get(url, {
        params: {
          code,
        },
      });

      const accessToken = response.data;

      return {
        accessToken,
      };
    } catch (e) {
      return '';
    }
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
    receiver, address, zonecode, phoneNumber, deliveryMessage,
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
      zonecode,
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
      zonecode: data.zonecode,
      phoneNumber: data.phoneNumber,
      deliveryMessage: data.deliveryMessage,
      createdAt: data.createdAt,
    };
  }

  async requestCart({
    userId, productId, image, name, description, price, totalPrice, inventory, quantity,
  }) {
    const url = `${baseUrl}/cart`;
    await axios.post(url, {
      userId,
      productId,
      image,
      name,
      description,
      price,
      totalPrice,
      inventory,
      quantity,
    }, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async fetchCart() {
    const url = `${baseUrl}/cart`;
    const { data } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async deleteCartItem(cartId) {
    const url = `${baseUrl}/cart/${cartId}`;

    await axios.delete(url, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async registerReview({
    userId, productId, name, title, rating, content, reviewImage,
  }) {
    const url = `${baseUrl}/reviews`;
    await axios.post(url, {
      userId,
      productId,
      name,
      title,
      rating,
      content,
      reviewImage,
    }, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async fetchReviews(pageNumber) {
    const url = `${baseUrl}/reviews`;
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

  async deleteReview(id) {
    const url = `${baseUrl}/reviews/${id}`;
    await axios.delete(url);
  }

  async updateReview({
    id, title, rating, content, reviewImage,
  }) {
    const url = `${baseUrl}/reviews/${id}`;
    await axios.patch(url, {
      title, rating, content, reviewImage,
    });
  }

  async fetchReview(id) {
    const url = `${baseUrl}/reviews/${id}`;
    const { data } = await axios.get(url);

    return {
      userId: data.userId,
      reviewId: data.reviewId,
      productId: data.productId,
      name: data.name,
      title: data.title,
      rating: data.rating,
      content: data.content,
      reviewImage: data.reviewImage,
    };
  }

  async upload(imageFile) {
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload/`;

    const formData = new FormData();

    formData.append('api_key', cloudinaryKey);
    formData.append('upload_preset', 'sn2yqsne');
    formData.append('timestamp', (Date.now() / 1000) || 0);
    formData.append('file', imageFile);

    const configOfUpload = {
      header: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.post(url, formData, configOfUpload);

    return data.url;
  }

  async requestKakaoPay({
    userId, productId, name, description, image, price, inventory, quantity,
    receiver, address, zonecode, phoneNumber, deliveryMessage, totalPrice,
  }) {
    const url = `${baseUrl}/orders/ready`;
    const { data } = await axios.post(url, {
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
      zonecode,
      phoneNumber,
      deliveryMessage,
      totalPrice,
    }, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.next_redirect_pc_url;
  }

  async approveKakaoPay(pgToken) {
    try {
      const url = `${baseUrl}/orders/success`;

      const response = await axios.get(url, {
        params: {
          pgToken,
        },
      });
      const responseEntity = response.data;

      return {
        responseEntity,
      };
    } catch (e) {
      return '';
    }
  }
}
export const apiService = new ApiService();
