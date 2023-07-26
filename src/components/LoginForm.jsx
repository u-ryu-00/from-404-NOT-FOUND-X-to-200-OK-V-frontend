import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { shopStore } from '../stores/ShopStore';
import KakaoLogin from './KakaoLogin';
import Title from './ui/Title';
import ErrorText from './ui/ErrorText';
import InputBox from './ui/InputBox';
import SubmitButton from './ui/SubmitButton';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 40rem;
  height: 5rem;
  align-items: center;
  background-color: #0056a8;
  color: #FFFFFF;
  font-family: 'Rowdies';
  font-size: 2rem;
`;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setUserId] = useLocalStorage('userId', '');
  const [, setPassword] = useLocalStorage('password', '');

  const onSubmit = async (data) => {
    const { userId, password } = data;
    const accessToken = await shopStore.login({ userId, password });

    if (accessToken) {
      setAccessToken(accessToken);
      setUserId(userId);
      setPassword(password);

      window.location.href = '/';
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>LOG IN</Title>
        <InputBox
          id="input-userId"
          placeholder="ID"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('userId', { required: true })}
        />
        <br />
        {errors.userId ? (
          <ErrorText>아이디를 입력해주세요.</ErrorText>
        ) : null}
        <InputBox
          id="input-password"
          placeholder="Password"
          type="password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
        />
        {errors.password ? (
          <ErrorText>비밀번호를 입력해주세요.</ErrorText>
        ) : null}
        {shopStore.loginState === 'fail' ? (
          <ErrorText>아이디 혹은 비밀번호가 맞지 않습니다.</ErrorText>
        ) : null}
        <KakaoLogin />
        <br />
        <SubmitButton type="submit" onClick={() => {}}>Log in</SubmitButton>
        <br />
        <StyledLink to="/signup">Register</StyledLink>
      </form>
    </Container>
  );
}
