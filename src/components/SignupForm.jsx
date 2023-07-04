import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useShopStore from '../hooks/useShopStore';

export default function SignupForm() {
  const [isSignupButtonClicked, setIsSignupButtonClicked] = useState(false);

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

  const handleSignupButtonClick = () => {
    setIsSignupButtonClicked(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>JOIN US</p>
      <div>
        <label htmlFor="input-account-name">
          이름 :
        </label>
        <br />
        <input
          id="input-account-name"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="input-account-userId">
          아이디 :
        </label>
        <br />
        <input
          id="input-account-userId"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('userId', { required: true })}
        />
        {(isSignupButtonClicked && shopStore.isSignupFail) || errors.name ? null : (
          <p>3~7자까지 한글만 사용 가능</p>
        )}
        {errors.name ? (
          <p>이름을 입력해주세요</p>
        ) : null}
        {shopStore.isSignupFail && errorMessage === '이름을 다시 확인해주세요' ? <p>{shopStore.errorMessage}</p> : null}
      </div>
      <div>
        <label htmlFor="input-account-password">
          비밀번호 :
        </label>
        <br />
        <input
          id="input-account-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
        />
      </div>
      <div>
        <label htmlFor="input-account-confirmPassword">
          비밀번호 확인 :
        </label>
        <br />
        <input
          id="input-account-confirmPassword"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('confirmPassword', { required: true })}
        />
      </div>
      <button type="submit" onClick={handleSignupButtonClick}>JOIN</button>
    </form>
  );
}
