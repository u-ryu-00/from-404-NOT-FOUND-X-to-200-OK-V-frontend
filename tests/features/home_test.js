Feature('홈 화면 - 고객은 홈 화면에서 서비스 이용을 시작할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인 전 홈 화면을 방문한 경우', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('Shop');
  I.see('from 404 NOT FOUND X to 200 OK V');
  I.see('SHOP MORE');
  I.see('Log in');
  I.see('Join us');
});

Scenario('로그인 후 홈 화면을 방문한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // 로그인 함.
  I.login();

  // Then
  I.see('Shop');
  I.see('from 404 NOT FOUND X to 200 OK V');
  I.see('SHOP MORE');
  I.see('Log out');
});
