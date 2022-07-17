import React, { useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { ToastType } from './ToastManager';
import { ToastIcon } from './ToastIcon';

const getTypeName = (type: ToastType): string => {
  switch (type) {
    case ToastType.Danger:
      return 'danger';
    case ToastType.Dark:
      return 'dark';
    case ToastType.Info:
      return 'info';
    case ToastType.Light:
      return 'light';
    case ToastType.Primary:
      return 'primary';
    case ToastType.Secondary:
      return 'secondary';
    case ToastType.Success:
      return 'success';
    case ToastType.Warning:
      return 'warning';
  }

  return 'normal';
};

export interface IDSToast {
  id: string;
  destroy: () => void;
  title: string;
  content: string;
  duration?: number;
  type?: ToastType;
}

/**
 * Component used for displaying Toast messages.
 *
 * @param destroy Callback function to call when the Toast expires or is closed
 * @param content The body of the Toast
 * @param title The title of the Toast
 * @param duration The amount of time (in milliseconds) the Toast should remain on the screen
 * @param type Type of Toast to show, using the ToastType enum
 */
const DSToast = ({ destroy, content, title, duration = 0, type = ToastType.None }: IDSToast) => {
  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  const toastStyle = getTypeName(type);

  return (
    <Toast autohide delay={duration} onClose={destroy}>
      <Toast.Header className={`toast-heading-${toastStyle}`}>
        <ToastIcon className="me-1" type={type} />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body className={`toast-body-${toastStyle}`}>{content}</Toast.Body>
    </Toast>
  );
};

export default DSToast;
