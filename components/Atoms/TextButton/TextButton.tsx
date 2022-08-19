import React, { ButtonHTMLAttributes } from 'react';
import styles from './TextButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  underline?: boolean;
}

const TextButton: React.FC<Props> = ({ className, children, underline, ...props }) => {
  return (
    <button className={cx(className, 'h-12 text-gray-500', { underline: underline })} {...props}>
      {children}
    </button>
  );
};

export default TextButton;
