Feature('주문 목록 확인 - 고객은 자신의 구매 내역을 확인할 수 있다.');

Scenario('(로그인 후) 주문내역이 없는 경우', ({ I }) => {
  // Given
  // 로그인 함.

  // When
  I.amOnPage('/orderList');

  // Then
  I.see('주문 내역이 없습니다.');
});

Scenario('(로그인 후) 주문내역이 있는 경우', ({ I }) => {
  // Given
  // 로그인 함.

  // When
  I.amOnPage('/orderList');

  // Then
  I.see('내가 주문한 내역입니다.');
});

Scenario('(로그인 전) 주문내역을 보려는 경우', ({ I }) => {
  // When
  I.amOnPage('/home');
  I.click('Order List');

  // Then
  I.amOnPage('/login');
});
