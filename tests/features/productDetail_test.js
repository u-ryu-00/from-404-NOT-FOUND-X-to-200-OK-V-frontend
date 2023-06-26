Feature('상품 세부 정보 확인 - 고객은 상품을 구매하기 위해 상품의 세부 정보를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인 전인 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');

  // Then
  I.see('옵션');
  I.see('TOTAL');
  I.see('구매하기');
  I.see('장바구니에 담기');
});

Scenario('로그인 후인 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');

  // Then
  I.see('옵션');
  I.see('TOTAL');
  I.see('구매하기');
  I.see('장바구니에 담기');
});

Feature('상품 리뷰 확인 - 고객은 상품 구매 전 해당 상품에 대한 다른 사람의 리뷰를 확인할 수 있다.');

Scenario('로그인 전인 경우', ({ I }) => {
  // When
  I.amOnPage('/products/1');

  // Then
  I.see('Review');
  I.see('WRITE');
});

Scenario('로그인 후인 경우', ({ I }) => {
  // Given
  // 로그인 함.

  // When
  I.amOnPage('/products/1');

  // Then
  I.see('Review');
  I.see('WRITE');
});

Scenario('등록된 리뷰가 없는 경우', ({ I }) => {
  // When
  I.amOnPage('/products/1');

  // Then
  I.see('아직 등록된 후기가 없습니다. 첫 번째 리뷰어가 되어주세요.');
});

Feature('상품 선택 - 고객은 원하는 상품과 개수, 옵션을 선택하고 상품을 주문할 수 있다.');

Scenario('(옵션 선택 X + 로그인 X) 구매하기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');
  // 옵션 선택을 하지 않음.

  // When
  I.click('구매하기');

  // Then
  I.see('필수 옵션을 선택해주세요.');
});

Scenario('(옵션 선택 O + 로그인 X) 구매하기 버튼을 누른 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');
  // 옵션을 선택함.

  // When
  I.click('구매하기');

  // Then
  I.amOnPage('/login');
  I.see('LOG IN');
});

Scenario('(옵션 선택 X + 로그인 O) 구매하기 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택하지 않음.

  // When
  I.click('구매하기');

  // Then
  I.see('필수 옵션을 선택해주세요.');
});

Scenario('(옵션 선택 O + 로그인 O) 구매하기 버튼을 누른 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택함.

  // When
  I.click('구매하기');

  // Then
  I.amOnPage('/order');
  I.see('주문서 작성');
});
