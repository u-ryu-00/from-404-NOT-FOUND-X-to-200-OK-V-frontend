Feature('상품 리뷰 확인 - 고객은 상품 구매 전 해당 상품에 대한 다른 사람의 리뷰를 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인 전인 경우', ({ I }) => {
  // When
  I.amOnPage('/products/1');

  // Then
  I.see('Review');
  I.see('WRITE');
});

Scenario('로그인 후인 경우', ({ I }) => {
  // Given
  I.login();

  // When
  I.amOnPage('/products/1');

  // Then
  I.see('Review');
  I.see('WRITE');
});

Feature('상품 리뷰 작성 - 고객은 상품 구매 후 구매한 상품에 대해 리뷰를 남길 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인을 하지 않고 상품 리뷰를 작성하려는 경우', ({ I }) => {
  // Given
  I.amOnPage('/products/1');

  // When
  I.fillField('제목', 'Good!');
  I.checkOption('★★★★★');
  I.fillField('리뷰 내용', '만족합니다.');
  I.click('WRITE');

  // Then
  I.amOnPage('/login');
});

Scenario('로그인은 했지만 해당 상품을 구매하지 않고 상품 리뷰를 작성하려는 경우', ({ I }) => {
  // Given
  I.login();
  I.deleteOrderHistory();
  I.amOnPage('/products/1');

  // When
  I.fillField('제목', 'Good!');
  I.checkOption('★★★★★');
  I.fillField('리뷰 내용', '만족합니다.');
  I.click('WRITE');

  // Then
  I.seeInPopup('상품을 구매하지 않아 리뷰를 작성하실 수 없습니다.');
  I.acceptPopup();
});

Scenario('제목을 미입력하여 리뷰쓰기 에러가 발생하는 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  I.login();
  I.setupOrder();
  I.amOnPage('/products/1');

  I.fillField('제목', '');
  I.checkOption('★★★★★');
  I.fillField('리뷰 내용', '만족합니다.');
  I.click('WRITE');

  // Then
  I.see('제목을 입력해주세요.');
});

Scenario('별점을 선택하지 않아 리뷰쓰기 에러가 발생하는 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  I.login();
  I.setupOrder();
  I.deleteReview();
  I.amOnPage('/products/1');

  I.fillField('제목', 'Good!');
  I.fillField('리뷰 내용', '만족합니다.');
  I.click('WRITE');

  // Then
  I.seeInPopup('별점을 선택해주세요.');
  I.acceptPopup();
});

Scenario('리뷰 내용을 미입력하여 리뷰쓰기 에러가 발생하는 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  I.login();
  I.setupOrder();
  I.amOnPage('/products/1');

  I.fillField('제목', 'Good!');
  I.checkOption('★★★★★');
  I.fillField('리뷰 내용', '');
  I.click('WRITE');

  // Then
  I.see('리뷰 내용을 입력해주세요.');
});

Scenario('내용을 모두 입력해서 성공적으로 리뷰가 등록된 경우 (해당 상품을 구매한 고객이 로그인 후 리뷰를 작성하려는 경우임.)', ({ I }) => {
  // Given
  I.login();
  I.setupOrder();
  I.deleteReview();
  I.amOnPage('/products/1');

  I.fillField('제목', 'Good!');
  I.checkOption('★★★★★');
  I.fillField('리뷰 내용', '만족합니다.');
  I.click('WRITE');

  // Then
  I.see('Good!');
  I.see('a111');
  I.see('수정');
  I.see('삭제');
});

Scenario('내가 등록한 리뷰를 삭제하려는 경우', ({ I }) => {
  // Given
  I.login();
  I.setupReview();
  I.amOnPage('/products/1');

  I.see('a111');
  I.see('삭제');

  // When
  I.click('삭제');

  // Then
  I.dontSee('a111');
});

Scenario('내가 등록한 리뷰의 제목을 수정하려는 경우', ({ I }) => {
  // Given
  I.login();
  I.setupReview();
  I.amOnPage('/products/1');

  I.see('a111');
  I.see('수정');

  // When
  I.click('수정');
  I.see('Edit Review');
  I.fillField('제목', '파우치 구매했습니다.');
  I.checkOption('★★★');
  I.click('WRITE');

  // Then
  I.see('파우치 구매했습니다.');
});
