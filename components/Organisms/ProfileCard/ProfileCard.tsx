import React from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import styles from './ProfileCard.module.scss';
import classNames from 'classnames/bind';
import { User } from '@/types/user';
import Card from '@/components/Atoms/Card';
import ProfileImage from '@/components/Atoms/ProfileImage';

const cx = classNames.bind(styles);

type Props = {
  profile?: User;
};

const ProfileCard: React.FC<Props> = ({ profile }) => {
  return (
    <Card className={cx('p-2 flex space-x-4 items-center')}>
      <ProfileImage width="w-20" height="h-20" image={profile?.profileImage} />
      <div>
        <div>{profile?.name}</div>
        <div>{profile?.email}</div>
      </div>
    </Card>
  );
};

export default ProfileCard;
