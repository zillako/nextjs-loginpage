import React, { useCallback, useState } from 'react';
import styles from './user.module.scss';
import classNames from 'classnames/bind';
import { useUser } from '@/hooks/user';
import ProfileCard from '@/components/Organisms/ProfileCard';
import Button from '@/components/Atoms/Button';
import Dialog from '@/components/Organisms/Dialog';
import { extractErrorMessage } from '@/apis/base';

const cx = classNames.bind(styles);

type Props = {};

const UserPage: React.FC<Props> = (props) => {
  const { user, loading, logout } = useUser({ redirectTo: '/login' });
  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false);

  const toggleLogoutDialog = useCallback(() => {
    setIsOpenLogoutDialog((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      const message = extractErrorMessage(error);
      alert(message);
    }
  }, [logout]);

  if (loading) {
    return <></>;
  }

  return (
    <>
      <div className={cx('py-8')}>
        <div className={cx('w-full max-w-sm mx-auto')}>
          <ProfileCard profile={user} />
        </div>
        <div className={cx('w-full max-w-sm mx-auto p-2')}>
          <button
            className={cx('h-12 text-gray-500')}
            onClick={toggleLogoutDialog}
          >{`로그아웃`}</button>
        </div>
      </div>
      <Dialog
        open={isOpenLogoutDialog}
        title="로그아웃"
        message="로그아웃 하시겠습니까?"
        onClose={toggleLogoutDialog}
        showFooterCloseButton
        closeText="취소"
        okText="로그아웃"
        onClickOK={handleLogout}
      />
    </>
  );
};

export default UserPage;
