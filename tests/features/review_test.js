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

Feature('상품 리뷰 작성 - 고객은 상품 구매 후 구매한 상품에 대해 리뷰를 남길 수 있다.');

Scenario('로그인을 하지 않고 상품 리뷰를 작성하려는 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');

  // When
  I.click('WRITE');

  // Then
  I.amOnPage('/login');
});

Scenario('로그인은 했지만 해당 상품을 구매하지 않고 상품 리뷰를 작성하려는 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // Order List에 해당 상품이 존재하지 않음.

  // When
  I.click('WRITE');

  // Then
  I.see('상품을 구매하지 않아 리뷰를 작성할 수 없습니다.');
});

Scenario('제목을 미입력하여 리뷰쓰기 에러가 발생하는 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // Order List에 해당 상품이 존재함.
  I.fillField('제목', '');
  I.fillField('내용', '색깔이 마음에 들어요.');

  // When
  I.click('WRITE');

  // Then
  I.see('입력하지 않은 항목이 있습니다.');
});

Scenario('내용을 미입력하여 리뷰쓰기 에러가 발생하는 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // Order List에 해당 상품이 존재함.
  I.fillField('제목', '파우치 구매 후기');
  I.fillField('내용', '');

  // When
  I.click('WRITE');

  // Then
  I.see('입력하지 않은 항목이 있습니다.');
});

Scenario('내용을 모두 입력해서 성공적으로 리뷰가 등록된 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // Order List에 해당 상품이 존재함.
  I.fillField('제목', '파우치 구매 후기');
  I.fillField('내용', '색깔이 마음에 들어요.');

  // When
  I.click('WRITE');

  // Then
  I.see('수정');
  I.see('삭제');
});

Scenario('내가 등록한 리뷰를 삭제하려는 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 해당 리뷰의 제목 보임.
  I.see('파우치 구매 후기');
  I.see('삭제');

  // When
  I.click('삭제');

  // Then
  I.dontSee('파우치 구매 후기');
});

Scenario('내가 등록한 리뷰의 제목을 수정하려는 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 해당 리뷰의 제목 보임.
  I.see('파우치 구매 후기');
  I.see('수정');

  // When
  I.click('수정');
  I.fillField('제목', '파우치 구매했습니다.');
  I.click('WRITE');

  // Then
  I.see('파우치 구매했습니다.');
});
