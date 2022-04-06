import React, { useEffect, useMemo } from 'react';
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

const getIcon = (type: ToastType): JSX.Element => {
  switch (type) {
    case ToastType.Info:
      return <InfoCircleFill />;
    case ToastType.Danger:
      return <ExclamationDiamondFill />;
    case ToastType.Dark:
      return <InfoCircleFill />;
    case ToastType.Light:
      return <InfoCircleFill />;
    case ToastType.Primary:
      return <InfoCircleFill />;
    case ToastType.Secondary:
      return <InfoCircleFill />;
    case ToastType.Success:
      return <CheckSquareFill />;
    case ToastType.Warning:
      return <ExclamationDiamondFill />;
    default:
      return <InfoCircleFill />;
  }
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
  const toastIcon = useMemo(() => getIcon(type), [type]);

  return (
    <Toast autohide delay={duration} onClose={destroy}>
      <Toast.Header className={`toast-heading-${toastStyle}`}>
        {toastIcon}
        <strong>{title}</strong>
      </Toast.Header>
      <Toast.Body className={`toast-body-${toastStyle}`}>{content}</Toast.Body>
    </Toast>
  );
};

export default DSToast;
