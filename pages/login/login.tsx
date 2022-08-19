import React, { useRef } from 'react';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useUser } from '@/hooks/user';
import Input from '@/components/Atoms/Input';
import Button from '@/components/Atoms/Button';
import { extractErrorMessage } from '@/apis/base';

const cx = classNames.bind(styles);

type Props = {};

const LoginPage: React.FC<Props> = (props) => {
  const { login } = useUser({ redirectIfFound: true, redirectTo: '/user' });

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const email = emailInputRef?.current?.value;
    const password = passwordInputRef.current?.value;

    if (email && password) {
      try {
        await login({ email, password });
      } catch (error) {
        const message = extractErrorMessage(error);
        alert(message);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleLogin();
  };

  return (
    <div className={cx('flex flex-col items-center')}>
      <div className={cx('py-4 font-bold text-lg')}>{`이메일로 로그인`}</div>
      <form
        className={cx('flex flex-col space-y-4 w-full max-w-xs')}
        onSubmit={handleSubmit}
        target="#"
      >
        <Input type="email" placeholder="이메일 입력" innerRef={emailInputRef} />
        <Input type="password" placeholder="비밀번호 입력" innerRef={passwordInputRef} />
        <Button type="submit">{`로그인`}</Button>
      </form>
    </div>
  );
};

export default LoginPage;
