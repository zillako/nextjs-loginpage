import React from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => {
  return <div className={cx(className, 'border rounded overflow-hidden shadow')}>{children}</div>;
};

export default Card;
