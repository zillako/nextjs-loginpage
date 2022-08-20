import React, { useRef } from 'react';
import styles from './resetPasswordIssue.module.scss';
import classNames from 'classnames/bind';
import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import { useResetPasswordState } from '@/state/atoms/resetPassword';
import { api_reset_password_issue } from '@/apis/user';
import { extractErrorMessage } from '@/apis/base';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

type Props = {};

const ResetPasswordIssue: React.FC<Props> = (props) => {
  const router = useRouter();
  const { setState: setResetPasswordState } = useResetPasswordState();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleIssueAuthCode = async () => {
    try {
      const email = emailInputRef.current?.value ?? '';

      const { issueToken, remainMillisecond } = await api_reset_password_issue({ email });

      if (issueToken && remainMillisecond) {
        const endMillisecond = new Date().getTime() + (remainMillisecond || 0);

        setResetPasswordState({
          email,
          issueToken: issueToken || '',
          endMillisecond,
        });

        router.push('/resetPassword/confirm', undefined, { shallow: true });
      } else {
        alert('다시 시도해주세요.');
      }
    } catch (error) {
      const message = extractErrorMessage(error);
      alert(message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleIssueAuthCode();
  };

  return (
    <div className={cx('flex flex-col items-center min-h-screen justify-center space-y-4')}>
      <div className={cx('py-4 font-bold text-lg')}>{`비밀번호 재설정`}</div>
      <form
        className={cx('flex flex-col space-y-4 w-full max-w-xs')}
        onSubmit={handleSubmit}
        target="#"
      >
        <Input type="email" placeholder="이메일 입력" innerRef={emailInputRef} />
        <Button type="submit">{`다음`}</Button>
      </form>
    </div>
  );
};

export default ResetPasswordIssue;
