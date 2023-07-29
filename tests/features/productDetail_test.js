Feature('상품 세부 정보 확인 - 고객은 상품을 구매하기 위해 상품의 세부 정보를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인 후인 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');

  // Then
  I.see('TOTAL : 49,000원');
  I.see('구매하기');
  I.see('장바구니에 담기');
});

Feature('상품 선택 - 고객은 원하는 상품과 개수를 선택하고 상품을 주문할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인을 하지 않고 구매하기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');

  // When
  I.click('구매하기');

  // Then
  I.amOnPage('/login');
});

Scenario('로그인 후 구매하기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');

  // When
  I.click('구매하기');

  // Then
  I.amOnPage('/order');
  I.see('소음이 적은 레이저 기계식 키보드');
  I.see('Order Sheet');
});
