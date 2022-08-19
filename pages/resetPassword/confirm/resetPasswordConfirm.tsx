import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './resetPasswordConfirm.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useResetPasswordState } from '@/state/atoms/resetPassword';
import { api_reset_password_confirm } from '@/apis/user';
import { resetPasswordState } from '../../../state/atoms/resetPassword';
import { extractErrorMessage } from '@/apis/base';
import Input from '@/components/Atoms/Input';
import Button from '@/components/Atoms/Button';

const cx = classNames.bind(styles);

type Props = {};

const ResetPasswordConfirm: React.FC<Props> = (props) => {
  const router = useRouter();
  const { state: resetPasswordState, setState: setResetPasswordState } = useResetPasswordState();
  const [remainMillisecond, setRemainMillisecond] = useState(() => {
    const _remainMillisecond = (resetPasswordState.endMillisecond || 0) - new Date().getTime();
    return _remainMillisecond <= 0 ? 0 : _remainMillisecond;
  });
  const authCodeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!resetPasswordState.issueToken) {
      router.push('/resetPassword/issue');
    }
  }, [resetPasswordState]);

  useEffect(() => {
    const interval = setInterval(() => {
      const _remainMillisecond = (resetPasswordState.endMillisecond || 0) - new Date().getTime();

      if (_remainMillisecond <= 0) {
        setRemainMillisecond(0);
        clearInterval(interval);
        alert('만료됨');
        router.push('/resetPassword/issue');
      } else {
        setRemainMillisecond(_remainMillisecond);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [resetPasswordState.endMillisecond]);

  const remainTimeString = useMemo(() => {
    if (remainMillisecond <= 0) {
      return '';
    }

    const mins = Math.floor(remainMillisecond / 1000 / 60);
    const secs = Math.floor((remainMillisecond / 1000) % 60);

    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, [remainMillisecond]);

  const handleConfirm = async () => {
    try {
      const { email = '', issueToken = '' } = resetPasswordState;
      const authCode = authCodeInputRef.current?.value ?? '';

      const confirmToken = await api_reset_password_confirm({ email, authCode, issueToken });

      if (confirmToken) {
        setResetPasswordState((prev) => {
          return {
            ...prev,
            confirmToken,
          };
        });

        router.push('/resetPassword/change', undefined, { shallow: true });
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

    handleConfirm();
  };

  return (
    <div className={cx('flex flex-col items-center min-h-screen justify-center space-y-4')}>
      <div className={cx('py-4 font-bold text-lg')}>{`비밀번호 재설정`}</div>
      <form className={cx('flex flex-col w-full max-w-xs')} onSubmit={handleSubmit} target="#">
        <div className={cx('relative')}>
          <Input
            className={cx('px-2')}
            type="text"
            placeholder="인증 코드 입력"
            innerRef={authCodeInputRef}
            disabled={remainMillisecond <= 0}
          />
          <span className={cx('absolute right-0 top-0 bottom-0 flex items-center')}>
            {remainTimeString}
          </span>
        </div>
        <Button
          className={cx('mt-4')}
          type="submit"
          disabled={remainMillisecond <= 0}
        >{`다음`}</Button>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
