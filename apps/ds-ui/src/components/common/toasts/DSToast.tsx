import React, { useEffect } from 'react';
import { CheckSquareFill, ExclamationDiamondFill, InfoCircleFill } from 'react-bootstrap-icons';
import Toast from 'react-bootstrap/Toast';
import { ToastType } from './ToastManager';

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

export interface ToastProps {
  id: string;
  destroy: () => void;
  title: string;
  content: string;
  duration?: number;
  type?: ToastType;
}
const DSToast: React.FC<ToastProps> = ({
  destroy,
  content,
  title,
  duration = 0,
  type = ToastType.None,
}: ToastProps) => {
  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  const toastStyle = getTypeName(type);
  let toastIcon: any = null;

  switch (type) {
    case ToastType.Info:
      toastIcon = <InfoCircleFill />;
      break;
    case ToastType.Danger:
      toastIcon = <ExclamationDiamondFill />;
      break;
    case ToastType.Dark:
      toastIcon = <InfoCircleFill />;
      break;
    case ToastType.Light:
      toastIcon = <InfoCircleFill />;
      break;
    case ToastType.Primary:
      toastIcon = <InfoCircleFill />;
      break;
    case ToastType.Secondary:
      toastIcon = <InfoCircleFill />;
      break;
    case ToastType.Success:
      toastIcon = <CheckSquareFill />;
      break;
    case ToastType.Warning:
      toastIcon = <ExclamationDiamondFill />;
      break;
    default:
      toastIcon = <InfoCircleFill />;
  }

  return (
    <Toast autohide delay={duration}>
      <Toast.Header className={`toast-heading-${toastStyle}`}>
        {toastIcon}
        <strong>{title}</strong>
      </Toast.Header>
      <Toast.Body className={`toast-body-${toastStyle}`}>{content}</Toast.Body>
    </Toast>
  );
};

export default DSToast;
