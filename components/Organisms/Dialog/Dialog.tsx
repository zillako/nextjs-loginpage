import React from 'react';
import styles from './Dialog.module.scss';
import classNames from 'classnames/bind';
import Button from '@/components/Atoms/Button';

const cx = classNames.bind(styles);

type Props = {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  message?: string;
  closeText?: string;
  showCloseIcon?: boolean;
  showFooterCloseButton?: boolean;
  okText?: string;
  onClickOK?: Function;
  onClickOKAsync?: () => Promise<any>;
  onClose?: Function;
  okButton?: React.ReactNode;
  backgroundToggle?: boolean;
  overFlowHidden?: boolean;
  okButtonId?: string;
  open: boolean;
};

const Dialog: React.FC<Props> = ({
  className,
  children,
  title,
  message,
  closeText,
  showCloseIcon = true,
  showFooterCloseButton = false,
  okText,
  onClickOK,
  onClickOKAsync,
  onClose,
  okButton,
  backgroundToggle = true,
  overFlowHidden = false,
  okButtonId = '',
  open,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleClickOK = () => {
    if (onClickOK) {
      if (onClickOK() !== false) {
        handleClose();
      }
    } else if (onClickOKAsync) {
      onClickOKAsync().then((res) => {
        if (res !== false) {
          handleClose();
        }
      });
    } else {
      handleClose();
    }
  };

  if (!open) {
    return <></>;
  }

  return (
    <div
      className={cx(
        'flex items-center justify-center fixed inset-0 w-full h-full z-30 overflow-auto bg-white/50',

        overFlowHidden === true && 'overflow-hidden'
      )}
      onClick={() => {
        if (backgroundToggle) handleClose();
      }}
    >
      <div
        className={cx(
          'z-40 bg-white text-black m-auto min-h-[10rem] min-w-[20rem] rounded',
          'shadow-black shadow-2xl',
          className
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="relative flex flex-col items-stratch ">
          <div
            className={cx(
              'absolute right-0 cursor-pointer w-10 h-10 flex justify-center items-center',
              { hidden: !showCloseIcon }
            )}
            onClick={handleClose}
          >
            <div className={cx('text-xs text-gray-500')}>{`닫기`}</div>
          </div>

          <div className={cx('flex-1 pt-8 pb-8 px-8 break-words text-sm h-full')}>
            <div className={cx('w-max text-2xl font-medium mx-auto')}>{title}</div>
            <div className={cx('w-max max-w-[575px] font-medium mx-auto mt-5 px-14 text-center')}>
              {message}
            </div>
            {children}
          </div>

          <div className="flex w-full space-x-2 p-2">
            {showFooterCloseButton && (
              <Button
                color="gray"
                px="px-4"
                fontWeight="font-bold"
                height="h-8"
                className="w-full"
                onClick={handleClose}
              >
                {closeText || '닫기'}
              </Button>
            )}
            {okButton
              ? okButton
              : (onClickOK || onClickOKAsync) && (
                  <Button
                    id={okButtonId}
                    color="black"
                    px="px-4"
                    fontWeight="font-bold"
                    height="h-8"
                    className="w-full"
                    onClick={handleClickOK}
                  >
                    {okText || '확인'}
                  </Button>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
