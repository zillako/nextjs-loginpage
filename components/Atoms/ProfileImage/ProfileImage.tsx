import React from 'react';
import styles from './ProfileImage.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cx = classNames.bind(styles);

type Props = {
  width?: string;
  height?: string;
  image?: string | File | null;
};

const ProfileImage = ({ width = 'w-[7.5rem]', height = 'h-[7.5rem]', image }: Props) => {
  if (image && typeof image === 'string') {
    return (
      <div
        className={cx(
          'flex relative',
          width,
          height,
          'bg-center bg-no-repeat bg-cover bg-transparent bg-white overflow-hidden rounded-full'
        )}
      >
        <Image src={image} layout="fill" objectFit="cover" priority />
      </div>
    );
  }
  return (
    <div className={cx('flex', width, height, 'bg-gray-500 overflow-hidden border rounded-full')} />
  );
};

export default ProfileImage;
