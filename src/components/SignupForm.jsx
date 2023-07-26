import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useShopStore from '../hooks/useShopStore';
import Title from './ui/Title';
import InputBox from './ui/InputBox';
import SubmitButton from './ui/SubmitButton';
import ErrorText from './ui/ErrorText';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 3rem;
  }
`;

export default function SignupForm() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const shopStore = useShopStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const {
      name, userId, password, confirmPassword,
    } = data;

    const accessToken = await shopStore.signup({
      name, userId, password, confirmPassword,
    });

    if (accessToken) {
      setAccessToken(accessToken);
    }

    if (shopStore.signupState === 'success') {
      navigate('/signup/complete');
    }
  };

  const { errorMessage } = shopStore;

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>JOIN US</Title>
        <div>
          <label htmlFor="input-account-name">
            이름 :
          </label>
          <br />
          <InputBox
            id="input-account-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name', { required: true })}
          />
          <br />
          <p>3~7자까지 한글만 사용 가능</p>
          {errors.name ? (
            <ErrorText>이름을 입력해주세요.</ErrorText>
          ) : null}
          {shopStore.isSignupFail && errorMessage === '이름을 다시 확인해주세요.' ? <ErrorText>{shopStore.errorMessage}</ErrorText> : null}
        </div>
        <div>
          <label htmlFor="input-account-userId">
            아이디 :
          </label>
          <br />
          <InputBox
            id="input-account-userId"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('userId', { required: true })}
          />
          <br />
          <p>영문 소문자/숫자 4~16자만 사용 가능</p>
          {errors.userId ? (
            <ErrorText>아이디를 입력해주세요.</ErrorText>
          ) : null}
          {shopStore.isSignupFail && errorMessage === '아이디를 다시 확인해주세요.' ? <ErrorText>{shopStore.errorMessage}</ErrorText> : null}
          {shopStore.isSignupFail && errorMessage === '해당 아이디는 사용할 수 없습니다.' ? <ErrorText>{shopStore.errorMessage}</ErrorText> : null}
        </div>
        <div>
          <label htmlFor="input-account-password">
            비밀번호 :
          </label>
          <br />
          <InputBox
            id="input-account-password"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', { required: true })}
          />
          <br />
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함.</p>
          {errors.password ? (
            <ErrorText>비밀번호를 입력해주세요.</ErrorText>
          ) : null}
          {shopStore.isSignupFail && errorMessage === '비밀번호를 다시 확인해주세요.' ? <ErrorText>{shopStore.errorMessage}</ErrorText> : null}
        </div>
        <div>
          <label htmlFor="input-account-confirmPassword">
            비밀번호 확인 :
          </label>
          <br />
          <InputBox
            id="input-account-confirmPassword"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('confirmPassword', { required: true })}
          />
          <br />
          {errors.confirmPassword ? (
            <ErrorText>비밀번호를 입력해주세요.</ErrorText>
          ) : null}
          {shopStore.isSignupFail && errorMessage === '비밀번호가 일치하지 않습니다.' ? <ErrorText>{shopStore.errorMessage}</ErrorText> : null}
        </div>
        <div>
          <SubmitButton type="submit">JOIN</SubmitButton>
        </div>
      </form>
    </Container>
  );
}
