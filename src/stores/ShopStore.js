/* eslint-disable class-methods-use-this */
import { apiService } from '../services/ApiService';

export default class ShopStore {
  constructor() {
    this.listeners = new Set();

    this.userId = '';
    this.name = '';
    this.password = '';
    this.amount = 0;

    this.productId = 0;
    this.description = '';
    this.image = '';
    this.price = 0;
    this.inventory = 0;

    this.quantity = 1;
    this.totalPrice = 0;

    this.orders = [];

    this.createdAt = '';

    this.orderState = '';
    this.registerProductState = '';
    this.deleteProductState = '';
    this.deleteReviewState = '';
    this.updateReviewState = '';
    this.kakaoPayState = '';

    this.products = [];

    this.carts = [];

    this.reviews = [];

    this.requestOrder = this.requestOrder.bind(this);

    this.reviewId = 0;

    this.imageUrl = '';

    this.ratingValue = '';

    this.kakaoPayPcUrl = '';
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
    this.changeLoginState('processing');
    try {
      const { accessToken, name, amount } = await apiService.postSession({
        userId, password,
      });

      this.name = name;
      this.amount = amount;
      this.userId = userId;
      this.password = password;
      this.changeLoginState('success');

      return accessToken;
    } catch (e) {
      this.changeLoginState('fail');
      return '';
    }
  }

  changeLoginState(state) {
    this.loginState = state;
    this.publish();
  }

  async signup({
    name, userId, password, confirmPassword,
  }) {
    this.changeSignupState('processing');
    try {
      const { accessToken, amount } = await apiService.signup({
        name, userId, password, confirmPassword,
      });
      this.amount = amount;
      this.changeSignupState('success');

      return accessToken;
    } catch (e) {
      this.changeSignupState('fail');
      return '';
    }
  }

  changeSignupState(state) {
    this.signupState = state;

    this.publish();
  }

  async kakaoLogin(code) {
    try {
      const { accessToken } = await apiService.kakaoLogin(code);

      return accessToken;
    } catch (e) {
      return '';
    }
  }

  async fetchAccount() {
    const { name, userId, amount } = await apiService.fetchAccount();

    this.name = name;
    this.userId = userId;
    this.amount = amount;

    this.publish();
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
  }) {
    this.changeOrderState('processing');
    try {
      await apiService.requestOrder({
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

  async fetchOrders(pageNumber) {
    const data = await apiService.fetchOrders(pageNumber);
    this.orders = data.orders;
    this.totalPages = data.totalPages;

    this.publish();
  }

  async fetchOrder(id) {
    const {
      orderId,
      productId, name, description, image, price, inventory, quantity,
      totalPrice,
      receiver, address, phoneNumber, deliveryMessage, createdAt,
    } = await apiService.fetchOrder(id);

    this.orderId = orderId;
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.inventory = inventory;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.receiver = receiver;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.deliveryMessage = deliveryMessage;
    this.createdAt = createdAt;

    this.publish();
  }

  async requestCart({
    userId,
    productId,
    image,
    name,
    description,
    price,
    totalPrice,
    inventory,
    quantity,
  }) {
    this.changeCartState('processing');
    try {
      await apiService.requestCart({
        userId,
        productId,
        image,
        name,
        description,
        price,
        totalPrice,
        inventory,
        quantity,
      });
      this.changeCartState('success');
    } catch (e) {
      this.changeCartState('fail');
    }
  }

  changeCartState(state) {
    this.cartState = state;

    this.publish();
  }

  async fetchCart(pageNumber) {
    const data = await apiService.fetchCart(pageNumber);
    this.carts = data.carts;
    this.totalPages = data.totalPages;

    this.publish();
  }

  plusCartQuantityAndTotalPrice(cart) {
    const updatedCarts = this.carts.map((item) => {
      if (item.cartId === cart.cartId) {
        const updatedQuantity = item.quantity + 1;
        const updatedTotalPrice = item.totalPrice + item.price;
        return { ...item, quantity: updatedQuantity, totalPrice: updatedTotalPrice };
      }
      return item;
    });
    this.carts = updatedCarts;
    this.publish();
  }

  minusCartQuantityAndTotalPrice(cart) {
    const updatedCarts = this.carts.map((item) => {
      if (item.cartId === cart.cartId) {
        const updatedQuantity = item.quantity - 1;
        const updatedTotalPrice = item.totalPrice - item.price;
        return { ...item, quantity: updatedQuantity, totalPrice: updatedTotalPrice };
      }
      return item;
    });
    this.carts = updatedCarts;
    this.publish();
  }

  async removeCartItem(cart) {
    await apiService.deleteCartItem(cart.cartId);
    const updatedCarts = this.carts.filter((item) => item.cartId !== cart.cartId);
    this.carts = updatedCarts;
    this.publish();
  }

  async registerReview({
    userId,
    productId,
    name,
    title,
    rating,
    content,
    reviewImage,
  }) {
    this.changeRegisterReviewState('processing');
    try {
      await apiService.registerReview({
        userId,
        productId,
        name,
        title,
        rating,
        content,
        reviewImage,
      });
      this.reviewedProducts.add(productId);

      this.changeRegisterReviewState('success');
    } catch (e) {
      this.changeRegisterReviewState('fail');
    }
  }

  changeRegisterReviewState(state) {
    this.reviewState = state;

    this.publish();
  }

  async fetchReviews(pageNumber) {
    const data = await apiService.fetchReviews(pageNumber);

    this.reviews = data.reviews;

    this.totalPages = data.totalPages;

    this.publish();
  }

  async deleteReview(id) {
    this.changeDeleteReviewState('processing');
    try {
      await apiService.deleteReview(id);

      this.changeDeleteReviewState('success');
      this.fetchReviews();
    } catch (e) {
      this.changeDeleteReviewState('fail');
    }
  }

  changeDeleteReviewState(state) {
    this.deleteReviewState = state;

    this.publish();
  }

  async updateReview({
    id, title, rating, content, reviewImage,
  }) {
    this.changeUpdateReviewState('processing');
    try {
      await apiService.updateReview({
        id, title, rating, content, reviewImage,
      });
      this.changeUpdateReviewState('success');
    } catch (e) {
      this.changeUpdateReviewState('fail');
    }
  }

  changeUpdateReviewState(state) {
    this.updateReviewState = state;

    this.publish();
  }

  async fetchReview(id) {
    const {
      userId, reviewId, productId, name, title, rating, content, reviewImage,
    } = await apiService.fetchReview(id);

    this.userId = userId;
    this.reviewId = reviewId;
    this.productId = productId;
    this.name = name;
    this.title = title;
    this.rating = rating;
    this.content = content;
    this.reviewImage = reviewImage;
    this.publish();
  }

  async uploadImage(imageFile) {
    const imageUrl = await apiService.upload(imageFile);

    this.imageUrl = imageUrl;
    this.publish();
  }

  setRating(value) {
    this.ratingValue = value;
    this.publish();
  }

  setAmount(value) {
    this.amount -= value;

    this.publish();
  }

  async requestKakaoPay({
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
  }) {
    this.changeKakaoPayState('processing');
    try {
      this.kakaoPayPcUrl = await apiService.requestKakaoPay({
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
      });

      console.log('리턴', this.kakaoPayPcUrl);
      this.changeKakaoPayState('success');
    } catch (e) {
      this.changeKakaoPayState('fail');
    }
  }

  changeKakaoPayState(state) {
    this.kakaoPayState = state;

    this.publish();
  }
}

export const shopStore = new ShopStore();
