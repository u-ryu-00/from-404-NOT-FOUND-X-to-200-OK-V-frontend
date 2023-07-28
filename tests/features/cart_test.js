Feature('장바구니 - 자신이 구매할 상품을 장바구니에 담아 한 번에 확인할 수 있다. (주문 전 수량 변경을 하거나 구매하지 않을 상품 삭제, 총 합계 확인 등)');
Feature('장바구니 (장바구니에 담기 버튼을 누르는 것에 대한 시나리오)');

Scenario('로그인 X 장바구니에 담기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');

  // When
  I.click('장바구니에 담기');

  // Then
  I.amOnPage('/login');
});

Scenario('로그인 O 장바구니에 담기 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');

  // When
  I.click('장바구니에 담기');

  // Then
  I.see('필수 옵션을 선택해주세요.');
});

Feature('장바구니(장바구니 모달창에 대한 시나리오)');

Scenario('장바구니 모달 창에서 장바구니 이동 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');

  // When
  I.click('장바구니 이동');

  // Then
  I.amOnPage('/cart');
});

Scenario('장바구니 모달 창에서 쇼핑 계속하기 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');

  // When
  I.click('쇼핑 계속하기');

  // Then
  I.amOnPage('/products/1');
});

Feature('장바구니(Cart 화면에 대한 시나리오)');

Scenario('Cart 화면에 접속한 경우 (Cart 화면은 로그인해야 접속할 수 있음.)', ({ I }) => {
  // When
  // 로그인 함.
  I.amOnPage('/cart');

  // Then
  I.amOnPage('주문하기');
});

Scenario('Cart에 담은 상품이 없는 경우', ({ I }) => {
  // When
  // 로그인 함.
  I.amOnPage('/cart');

  // Then
  I.see('장바구니에 상품이 없습니다.');
});

Scenario('Cart에 담은 상품이 있는 경우', ({ I }) => {
  // When
  // 로그인 함.
  I.amOnPage('/cart');

  // Then
  I.see('삭제');
  I.see('총 합계');
  I.see('주문하기');
});

Scenario('Cart에 담은 상품이 하나 있을 때 삭제 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/cart');
  I.see('삭제');
  I.see('총 합계');

  // When
  I.click('삭제');

  // Then
  I.dontSee('삭제');
});

Scenario('Cart에 담은 상품이 있을 때 주문하기 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/cart');
  I.see('삭제');
  I.see('총 합계');

  // When
  I.click('주문하기');

  // Then
  I.amOnPage('/order');
});
