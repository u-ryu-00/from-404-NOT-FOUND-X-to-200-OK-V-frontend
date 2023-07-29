Feature('상품 구매 - 상품 주문과 결제를 완료할 수 있다.');

Scenario('로그인 하지 않고 주문서 작성 화면에 접속하는 경우', ({ I }) => {
  // When
  I.amOnPage('/products/1');
  I.click('구매하기');

  // Then
  I.amOnPage('/login');
});

Scenario('주문서 작성 화면에 접속하는 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');

  // When
  I.click('구매하기');

  // Then
  I.see('Order Sheet');
  I.see('총 합계 : 49,000원');
});

Scenario('받으시는 분 항목을 미입력하여 결제하기 에러가 발생하는 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('구매하기');

  // When
  // 입력폼에 받으시는 분 이름을 입력하지 않음.
  I.fillField('받으시는 분', '');
  I.fillField('주소', '경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)');
  I.fillField('우편번호', '13529');
  I.fillField('휴대전화', '010-1234-5678');
  I.fillField('배송메시지', '안전배송 부탁드립니다.');
  I.click('[type="submit"]');

  // Then
  I.see('받으시는 분 성함을 입력해주세요.');
});

Scenario('휴대전화 번호를 미입력하여 결제하기 에러가 발생하는 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('구매하기');

  // When
  // 입력폼에 휴대전화 번호를 입력하지 않음
  I.fillField('받으시는 분', '받으시는 분');
  I.fillField('주소', '경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)');
  I.fillField('우편번호', '13529');
  I.fillField('휴대전화', '');
  I.fillField('배송메시지', '안전배송 부탁드립니다.');
  I.click('[type="submit"]');

  // Then
  I.see('받으시는 분 휴대폰 번호를 입력해주세요.');
});

Scenario('결제하기에 성공한 경우', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products/1');
  I.click('구매하기');

  // When
  I.fillField('받으시는 분', '받으시는 분');
  I.fillField('주소', '경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)');
  I.fillField('우편번호', '13529');
  I.fillField('휴대전화', '010-1234-5678');
  I.fillField('배송메시지', '안전배송 부탁드립니다.');
  I.click('[type="submit"]');

  // Then
  I.see('카톡결제');
});
