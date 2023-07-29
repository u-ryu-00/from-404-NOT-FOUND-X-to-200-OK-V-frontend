/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';
module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
    this.waitForText('OK');
  },

  deleteCart() {
    this.amOnPage(`${backdoorBaseUrl}/delete-cart`);
    this.waitForText('OK');
  },

  deleteOrderHistory() {
    this.amOnPage(`${backdoorBaseUrl}/delete-orderHistory`);
    this.waitForText('OK');
  },

  deleteReview() {
    this.amOnPage(`${backdoorBaseUrl}/delete-review`);
    this.waitForText('OK');
  },

  deleteProduct() {
    this.amOnPage(`${backdoorBaseUrl}/delete-product`);
    this.waitForText('OK');
  },

  login() {
    this.amOnPage('/login');

    this.fillField('ID', 'a111');
    this.fillField('Password', 'Aa1!!!!!');

    this.click('[type=submit]');

    this.wait(2);

    this.waitForText('Log out');
  },

  setupOrder() {
    this.amOnPage(`${backdoorBaseUrl}/setup-order`);
    this.waitForText('OK');
  },

  setupReview() {
    this.amOnPage(`${backdoorBaseUrl}/setup-review`);
    this.waitForText('OK');
  },
});
