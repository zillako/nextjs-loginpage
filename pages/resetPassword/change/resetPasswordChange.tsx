import React, { useEffect, useRef } from 'react';
import styles from './resetPasswordChange.module.scss';
import classNames from 'classnames/bind';
import { useResetPasswordState } from '@/state/atoms/resetPassword';
import { useRouter } from 'next/router';
import Input from '@/components/Atoms/Input';
import Button from '@/components/Atoms/Button';
import { extractErrorMessage } from '@/apis/base';
import { api_reset_password_change } from '@/apis/user';

const cx = classNames.bind(styles);

type Props = {};

const ResetPasswordChange: React.FC<Props> = (props) => {
  const router = useRouter();
  const { state: resetPasswordState, setState: setResetPasswordState } = useResetPasswordState();
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!resetPasswordState.confirmToken) {
      router.push('/resetPassword/issue');
    }
  }, [resetPasswordState]);

  const handlePasswordChange = async () => {
    try {
      const { email = '', confirmToken = '' } = resetPasswordState;
      const newPassword = newPasswordInputRef.current?.value ?? '';
      const newPasswordConfirm = newPasswordConfirmInputRef.current?.value ?? '';

      await api_reset_password_change({ email, confirmToken, newPassword, newPasswordConfirm });
      alert('비밀번호가 변경되었습니다.');
      router.push('/login', undefined, { shallow: true });
    } catch (error) {
      const message = extractErrorMessage(error);
      alert(message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handlePasswordChange();
  };

  return (
    <div className={cx('flex flex-col items-center min-h-screen justify-center space-y-4')}>
      <div className={cx('py-4 font-bold text-lg')}>{`비밀번호 재설정`}</div>
      <form
        className={cx('flex flex-col space-y-4 w-full max-w-xs')}
        onSubmit={handleSubmit}
        target="#"
      >
        <Input type="password" placeholder="새로운 비밀번호" innerRef={newPasswordInputRef} />
        <Input
          type="password"
          placeholder="새로운 비밀번호 확인"
          innerRef={newPasswordConfirmInputRef}
        />
        <Button type="submit">{`비밀번호 변경하기`}</Button>
      </form>
    </div>
  );
};

export default ResetPasswordChange;
