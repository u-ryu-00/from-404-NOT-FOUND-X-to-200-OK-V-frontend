Feature('장바구니 - 자신이 구매할 상품을 장바구니에 담아 한 번에 확인할 수 있다. (주문 전 수량 변경을 하거나 구매하지 않을 상품 삭제, 총 합계 확인 등)');
Feature('장바구니 (장바구니에 담기 버튼을 누르는 것에 대한 시나리오)');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.deleteCart();
});

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
  I.login();
  I.amOnPage('/products/1');

  // When
  I.click('장바구니에 담기');

  I.see('장바구니에 상품이 정상적으로 담겼습니다.');
});

Scenario('로그인 O 재고보다 많은 수량을 선택하고 장바구니에 담기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.login();

  I.amOnPage('/products/1');

  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');
  I.click('+');

  // When
  I.click('장바구니에 담기');

  I.see('재고가 부족하여 11개까지만 장바구니에 담을 수 있습니다.');

  I.click('-');
  I.click('-');

  I.click('장바구니에 담기');

  I.see('장바구니에 상품이 정상적으로 담겼습니다.');
});

Feature('장바구니(장바구니 모달창에 대한 시나리오)');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.deleteCart();
});

Scenario('장바구니 모달 창에서 장바구니 이동 버튼을 누른 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('장바구니에 담기');
  I.see('장바구니에 상품이 정상적으로 담겼습니다.');

  // When
  I.click('장바구니 이동');

  // Then
  I.amOnPage('/cart');
});

Scenario('장바구니 모달 창에서 쇼핑 계속하기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('장바구니에 담기');
  I.see('장바구니에 상품이 정상적으로 담겼습니다.');

  // When
  I.click('쇼핑 계속하기');

  // Then
  I.amOnPage('/products');
});

Feature('장바구니(Cart 화면에 대한 시나리오)');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.deleteCart();
});

Scenario('로그인 전 Cart 화면에 접속한 경우', ({ I }) => {
  // When
  I.amOnPage('/cart');

  // Then
  I.amOnPage('/login');
});

Scenario('로그인 후 Cart 화면에 접속한 경우', ({ I }) => {
  // Given
  I.login();

  // When
  I.amOnPage('/cart');

  // Then
  I.see('My Cart');
});

Scenario('Cart에 담은 상품이 없는 경우', ({ I }) => {
  // Given
  I.login();

  // When
  I.amOnPage('/cart');

  // Then
  I.see('My Cart');
  I.see('장바구니에 상품이 없습니다.');
});

Scenario('Cart에 담은 상품이 있는 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('+');

  I.click('장바구니에 담기');
  I.click('x');

  I.amOnPage('/products/2');

  I.click('장바구니에 담기');

  I.click('장바구니 이동');

  // When
  I.amOnPage('/cart');

  // Then
  I.see('소음이 적은 레이저 기계식 키보드');
  I.see('98,000원');

  I.see('거북이 인형');
  I.see('30,000원');

  I.see('장바구니 목록에서 상품 삭제');

  I.see('TOTAL : 128,000원');

  I.see('주소 입력하기');
});

Scenario('Cart에 담은 상품이 있을 때 구매 수량을 변경하는 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('+');

  I.click('장바구니에 담기');
  I.click('x');

  I.amOnPage('/products/2');

  I.click('장바구니에 담기');

  I.click('장바구니 이동');

  // When
  I.amOnPage('/cart');

  // Then
  I.see('소음이 적은 레이저 기계식 키보드');
  I.click('-');
  I.see('49,000원');

  I.see('거북이 인형');
  I.see('30,000원');

  I.see('장바구니 목록에서 상품 삭제');

  I.see('TOTAL : 79,000원');

  I.see('주소 입력하기');
});

Scenario('Cart에 담은 상품이 하나 있을 때 삭제 버튼을 누른 경우', ({ I }) => {
  I.login();
  I.amOnPage('/products/1');
  I.click('+');

  I.click('장바구니에 담기');

  I.click('장바구니 이동');

  // When
  I.amOnPage('/cart');

  I.see('소음이 적은 레이저 기계식 키보드');
  I.click('장바구니 목록에서 상품 삭제');

  I.dontSee('소음이 적은 레이저 기계식 키보드');

  // Then
  I.see('장바구니에 상품이 없습니다.');
});

Scenario('Cart에 담은 상품이 있을 때 주문하기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('+');

  I.click('장바구니에 담기');

  I.click('장바구니 이동');

  I.amOnPage('/cart');

  I.fillField('받으시는 분', '받으시는 분');
  I.fillField('주소', '경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)');
  I.fillField('우편번호', '13529');
  I.fillField('휴대전화', '010-1234-5678');
  I.fillField('배송메시지', '안전배송 부탁드립니다.');

  // When
  I.click('[type=submit]');

  // Then
  I.see('카톡결제');
});
