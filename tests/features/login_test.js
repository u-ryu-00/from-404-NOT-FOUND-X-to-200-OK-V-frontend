Feature('로그인 - 고객은 자신임을 증명하기 위해 로그인을 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
});

Scenario('로그인을 하러 로그인 화면에 접속한 경우', ({ I }) => {
  // when
  I.amOnPage('/login');

  // Then
  I.see('LOG IN');
});

Scenario('잘못된 아이디를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/login');

  // When
  // 잘못된 아이디를 입력폼에 입력함.
  I.fillField('ID', 'xxx');
  I.fillField('Password', 'Aa1!!!!!');

  I.click('[type=submit]');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다.');
});

Scenario('잘못된 비밀번호를 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/login');

  // When
  // 잘못된 비밀번호를 입력폼에 입력함.
  I.fillField('ID', 'a111');
  I.fillField('Password', 'xxx');

  I.click('[type=submit]');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다.');
});

Scenario('아이디를 미입력하여 로그인 에러가 발생하는 경우', ({ I }) => {
  // Given
  I.amOnPage('/login');

  // When
  I.fillField('ID', '');
  I.fillField('Password', 'Aa1!!!!!');

  I.click('[type=submit]');

  // Then
  I.see('아이디를 입력해주세요.');
});

Scenario('비밀번호를 미입력하여 로그인 에러가 발생하는 경우', ({ I }) => {
  // Given
  I.amOnPage('/login');

  // When
  I.fillField('ID', 'a111');
  I.fillField('Password', '');

  I.click('[type=submit]');

  // Then
  I.see('비밀번호를 입력해주세요.');
});

Scenario('로그인에 성공한 경우', ({ I }) => {
  // Given
  I.amOnPage('/login');

  // When
  // 올바른 아이디와 비밀번호를 모두 입력함.
  I.fillField('ID', 'a111');
  I.fillField('Password', 'Aa1!!!!!');

  I.click('[type=submit]');

  // Then
  I.amOnPage('/');
});
