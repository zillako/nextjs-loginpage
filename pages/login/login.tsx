import React, { useRef, useState } from 'react';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useUser } from '@/hooks/user';
import Input from '@/components/Atoms/Input';
import Button from '@/components/Atoms/Button';
import { extractErrorMessage, extractErrorStatus } from '@/apis/base';
import TextButton from '@/components/Atoms/TextButton';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

type Props = {};

const LoginPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const { login } = useUser({ redirectIfFound: true, redirectTo: '/user' });
  const [loading, setLoading] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    setLoading(true);
    const email = emailInputRef?.current?.value;
    const password = passwordInputRef.current?.value;

    setEmailInvalid('');
    setPasswordInvalid('');

    if (email && password) {
      try {
        await login({ email, password });
      } catch (error) {
        const message = extractErrorMessage(error);
        if (extractErrorStatus(error) === 400) {
          setPasswordInvalid(message);
        } else if (extractErrorStatus(error) === 404) {
          setEmailInvalid(message);
        } else {
          alert(message);
        }
      }
    }
    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleLogin();
  };

  const handleClickResetPassword = () => {
    router.push('/resetPassword');
  };

  return (
    <div className={cx('flex flex-col items-center min-h-screen justify-center space-y-4')}>
      <div className={cx('py-4 font-bold text-lg')}>{`이메일로 로그인`}</div>
      <form
        className={cx('flex flex-col space-y-4 w-full max-w-xs')}
        onSubmit={handleSubmit}
        target="#"
      >
        <Input
          name="email"
          type="email"
          placeholder="이메일 입력"
          innerRef={emailInputRef}
          invalid={emailInvalid}
          disabled={loading}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호 입력"
          innerRef={passwordInputRef}
          invalid={passwordInvalid}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>{`로그인`}</Button>
      </form>
      <TextButton
        className={cx('py-2')}
        onClick={handleClickResetPassword}
        underline
        disabled={loading}
      >{`비밀번호 재설정`}</TextButton>
    </div>
  );
};

export default LoginPage;
