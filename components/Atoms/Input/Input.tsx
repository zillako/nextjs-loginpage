import React, { ChangeEvent, FC, InputHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  outerClassName?: string;
  className?: string;
  center?: boolean;
  py?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  invalid?: string;
}

const Input: FC<Props> = ({
  outerClassName,
  className,
  py = 'py-2',
  innerRef,
  invalid,
  ...props
}) => {
  return (
    <div className={cx(outerClassName, 'relative transition-all')}>
      <input
        className={cx(
          className,
          'w-full bg-transparent appearance-none shadow-none rounded-none border-t-none border-l-none border-r-none border-b outline-none',

          invalid ? 'border-red-600' : 'border-gray-600 dark:border-gray-200',
          py
        )}
        ref={innerRef}
        {...props}
      />
      {invalid ? (
        <div className={cx('invalid-tooltip', 'shadow')}>
          <div>{invalid}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
