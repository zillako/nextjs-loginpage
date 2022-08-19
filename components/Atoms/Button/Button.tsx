import React, { ButtonHTMLAttributes, useMemo } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  fontSize?: string;
  fontWeight?: string;
  color?: 'black' | 'gray';
  backgroundColor?: string;
  activeBackgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  height?: string;
  px?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  className,
  fontSize = 'text-base',
  fontWeight = 'font-medium',
  color = 'gray',
  height = 'h-14',
  px = 'px-12 sm:px-16',
  ...props
}: Props) => {
  const colorStyle = useMemo(() => {
    let backgroundColor = props.backgroundColor;
    let activeBackgroundColor = props.activeBackgroundColor;
    let textColor = props.textColor;
    let activeTextColor = props.activeTextColor;

    if (props.disabled || color === 'gray') {
      backgroundColor = 'bg-gray-500 dark:bg-gray-200';
      activeBackgroundColor = 'active:bg-gray-200 dark:active:bg-gray-500';
      textColor = 'text-white dark:text-black';
      activeTextColor = 'active:text-black dark:active:text-white';
    } else if (color === 'black') {
      backgroundColor = 'bg-black dark:bg-white';
      activeBackgroundColor = 'active:bg-white dark:active:bg-black';
      textColor = 'text-white dark:text-black';
      activeTextColor = 'active:text-black dark:active:text-white';
    }

    if (props.disabled) {
      activeBackgroundColor = '';
      activeTextColor = '';
    }

    return `${backgroundColor} ${activeBackgroundColor} ${textColor} ${activeTextColor}`;
  }, [
    props.backgroundColor,
    props.activeBackgroundColor,
    props.textColor,
    props.activeTextColor,
    props.disabled,
    color,
  ]);

  return (
    <button
      className={cx(className, fontSize, fontWeight, colorStyle, height, px, 'rounded')}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
