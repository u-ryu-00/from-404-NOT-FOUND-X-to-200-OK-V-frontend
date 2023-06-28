Feature('상품 목록 확인 - 고객은 상품 목록을 보고 마음에 드는 상품을 고를 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('상품이 있는 경우', ({ I }) => {
  // When
  I.amOnPage('/products');

  // Then
  // Shop 화면에 [상품 이름] 글씨 보임.
  I.see('키보드');
});

Scenario('두번째 페이지를 클릭하는 경우', ({ I }) => {
  // When
  I.amOnPage('/products');

  I.click('2');

  // Then
  // Shop 화면에 [상품 이름] 글씨 보임.
  I.see('조명');
});

Scenario('상품이 없는 경우', ({ I }) => {
  // Given
  I.deleteProduct();

  // When
  I.amOnPage('/products');

  // Then
  I.see('상품이 존재하지 않습니다.');

  I.setupDatabase();
});
