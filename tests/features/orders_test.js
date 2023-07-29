Feature('주문 목록 확인 - 고객은 자신의 구매 내역을 확인할 수 있다.');

Scenario('로그인 하지 않고 주문 목록 확인 화면에 접속하는 경우', ({ I }) => {
  // When
  I.amOnPage('/orders');

  // Then
  I.amOnPage('/login');
});

Scenario('(로그인 후) 주문내역이 없는 경우', ({ I }) => {
  // Given
  I.login();
  I.deleteOrderHistory();

  // When
  I.amOnPage('/orders');

  // Then
  I.see('주문 내역이 없습니다.');
});

Scenario('(로그인 후) 주문내역이 있는 경우', ({ I }) => {
  // Given
  I.login();
  I.deleteOrderHistory();
  I.setupOrder();
  I.amOnPage('/orders');

  // Then

  I.see('My Orders');
  I.see('소음이 적은 레이저 기계식 키보드');
});
