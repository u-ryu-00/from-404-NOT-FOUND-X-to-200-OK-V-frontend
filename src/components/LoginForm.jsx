import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { Link, useNavigate } from 'react-router-dom';
import { shopStore } from '../stores/ShopStore';
import KakaoLogin from './KakaoLogin';

export default function LoginForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const onSubmit = async (data) => {
    const { userId, password } = data;
    const accessToken = await shopStore.login({ userId, password });

    if (accessToken) {
      setAccessToken(accessToken);

      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>LOG IN</h1>
      <div>
        <label htmlFor="input-userId">
          아이디
        </label>
        <input
          id="input-userId"
          placeholder="ID"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('userId', { required: true })}
        />
        {errors.userId ? (
          <p>아이디를 입력해주세요</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="input-password">
          비밀번호
        </label>
        <input
          id="input-password"
          placeholder="Password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
        />
        {errors.password ? (
          <p>비밀번호를 입력해주세요</p>
        ) : null}
        {shopStore.loginState === 'fail' ? (
          <p>아이디 혹은 비밀번호가 맞지 않습니다.</p>
        ) : null}
        <KakaoLogin />
      </div>
      <button type="submit" onClick={() => {}}>Log in</button>
      <br />
      <Link to="/signup">Register</Link>
    </form>
  );
}
