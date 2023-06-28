Feature('상품 구매 - 상품 주문과 결제를 완료할 수 있다.');

Scenario('주문서 작성 화면에 접속하는 경우', ({ I }) => {
  // When
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택함.
  I.click('구매하기');
  I.amOnPage('/order');

  // Then
  I.see('주문서 작성');
  I.see('총 합계');
  I.see('결제하기');
});

Scenario('받으시는 분 항목을 미입력하여 결제하기 에러가 발생하는 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택함.
  I.click('구매하기');
  I.amOnPage('/order');
  I.see('주문서 작성');
  I.see('총 합계');

  // When
  // 입력폼에 받으시는 분 이름을 입력하지 않음.
  I.fillField('받으시는 분', '');
  I.fillField('주소', '서울시 성동구');
  I.fillField('휴대전화', '010-1234-5678');
  I.click('결제하기');

  // Then
  I.see('필수 입력 항목을 입력해주세요.');
});

Scenario('주소를 미입력하여 결제하기 에러가 발생하는 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택함.
  I.click('구매하기');
  I.amOnPage('/order');
  I.see('주문서 작성');
  I.see('총 합계');

  // When
  // 입력폼에 주소를 입력하지 않음
  I.fillField('받으시는 분', '이름');
  I.fillField('주소', '');
  I.fillField('휴대전화', '010-1234-5678');
  I.click('결제하기');

  // Then
  I.see('필수 입력 항목을 입력해주세요.');
});

Scenario('휴대전화 번호를 미입력하여 결제하기 에러가 발생하는 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택함.
  I.click('구매하기');
  I.amOnPage('/order');
  I.see('주문서 작성');
  I.see('총 합계');

  // When
  // 입력폼에 휴대전화 번호를 입력하지 않음
  I.fillField('받으시는 분', '이름');
  I.fillField('주소', '서울시 성동구');
  I.fillField('휴대전화', '');
  I.click('결제하기');

  // Then
  I.see('필수 입력 항목을 입력해주세요.');
});

Scenario('결제하기에 성공한 경우', ({ I }) => {
  // Given
  // 로그인 함.
  I.amOnPage('/products/1');
  // 옵션을 선택함.
  I.click('구매하기');
  I.amOnPage('/order');
  I.see('주문서 작성');
  I.see('총 합계');

  // When
  // 입력폼에 휴대전화 번호를 입력하지 않음
  I.fillField('받으시는 분', '이름');
  I.fillField('주소', '서울시 성동구');
  I.fillField('휴대전화', '010-1234-5678');
  I.click('결제하기');

  // Then
  I.amOnPage('/orders');
  I.see('내가 주문한 내역입니다.');
});
