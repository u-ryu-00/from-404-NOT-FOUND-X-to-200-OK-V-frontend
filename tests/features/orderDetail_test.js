Feature('주문 세부 정보 확인 - 고객은 자신이 주문한 상품의 주문 세부 정보를 확인할 수 있다.');

Scenario('로그인 후 주문 세부 정보를 보려는 경우', ({ I }) => {
  I.setupDatabase();
  I.login();
  I.setupOrder();
  I.amOnPage('/orders');

  I.see('My Orders');

  I.click('상품 이름 : 소음이 적은 레이저 기계식 키보드');

  // Then
  I.see('총 상품금액');
  I.see('49,000원');
  I.see('받으시는 분');
  I.see('받으시는 분');
  I.see('주소');
  I.see('경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)');
  I.see('리뷰 작성하러 가기');
});
