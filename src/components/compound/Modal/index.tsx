import { Button } from '@components/primitive';
import { Dialog, DialogContent, DialogProps } from '@mui/material';
import modalStyles from '@scss/components/modal.scss?type=scoped';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props extends DialogProps {
  handleClose?: () => void;
  children?: ReactNode;
  open: boolean;
  title?: string;
  isClose?: boolean;
  className?: string;
  onModalEntered?: () => void;
  onModalExited?: () => void;
}

const defaultProps = {
  handleClose: () => null,
  children: null,
  title: '',
  isClose: true,
  className: '',
  onModalEntered: () => null,
  onModalExited: () => null,
};

function Modal({
  handleClose,
  children,
  open,
  title,
  isClose,
  className,
  onModalEntered,
  onModalExited,
  ...props
}: Props) {
  const onEntered = () => {
    disableBodyScroll(document.body);
    onModalEntered();
  };

  const onExited = () => {
    clearAllBodyScrollLocks();
    if (document.body.style.overflow === 'hidden') {
      document.body.style.removeProperty('overflow');
    }
    onModalExited();
  };

  return (
    <>
      <style jsx>{modalStyles}</style>
      <Dialog
        className={classNames('ibc-modal', className)}
        open={open}
        TransitionProps={{
          onEntered,
          onExited,
        }}
        {...props}
      >
        {isClose && (
          <div className="ibc-modal__close">
            <Button onClick={() => handleClose()} />
            <button onClick={() => handleClose()}>Close</button>
          </div>
        )}
        <DialogContent>
          {title && <div className="ibc-modal__title">{title}</div>}
          <div className="ibc-modal__content">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
