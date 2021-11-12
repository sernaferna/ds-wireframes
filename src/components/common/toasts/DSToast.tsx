import React, { useEffect } from 'react';
import { CheckSquareFill, ExclamationDiamondFill, InfoCircleFill } from 'react-bootstrap-icons';
import Toast from 'react-bootstrap/Toast';
import { ToastType } from './ToastManager';

export interface ToastProps {
  id: string;
  destroy: () => void;
  title: string;
  content: string;
  duration?: number;
  type?: ToastType;
}

const DSToast: React.FC<ToastProps> = (props) => {
  const { destroy, content, title, duration = 0, id, type = ToastType.None } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  let toastIcon: any = null;
  let color = 'text-';
  let titleColor = 'text-';
  let bgStyle = '';

  switch (type) {
    case ToastType.Info:
      toastIcon = <InfoCircleFill className="me-1 text-info" />;
      color += 'white';
      titleColor += 'info';
      bgStyle = 'info';
      break;
    case ToastType.Danger:
      toastIcon = <ExclamationDiamondFill className="me-1 text-danger" />;
      color += 'white';
      titleColor += 'danger';
      bgStyle = 'danger';
      break;
    case ToastType.Dark:
      toastIcon = <InfoCircleFill className="me-1 text-dark" />;
      color += 'white';
      titleColor += 'dark';
      bgStyle = 'dark';
      break;
    case ToastType.Light:
      toastIcon = <InfoCircleFill className="me-1 text-default" />;
      color += 'default';
      titleColor += 'dark';
      bgStyle = 'light';
      break;
    case ToastType.Primary:
      toastIcon = <InfoCircleFill className="me-1 text-primary" />;
      color += 'white';
      titleColor += 'primary';
      bgStyle = 'primary';
      break;
    case ToastType.Secondary:
      toastIcon = <InfoCircleFill className="me-1 text-secondary" />;
      color += 'white';
      titleColor += 'secondary';
      bgStyle = 'secondary';
      break;
    case ToastType.Success:
      toastIcon = <CheckSquareFill className="me-1 text-success" />;
      color += 'white';
      titleColor += 'success';
      bgStyle = 'success';
      break;
    case ToastType.Warning:
      toastIcon = <ExclamationDiamondFill className="me-1 text-warning" />;
      color += 'white';
      titleColor += 'warning';
      bgStyle = 'warning';
      break;
    default:
      toastIcon = <InfoCircleFill className="me-1 text-default" />;
      color += 'dark';
      titleColor += 'dark';
  }

  return (
    <Toast autohide delay={duration} bg={bgStyle}>
      <Toast.Header className={titleColor}>
        {toastIcon}
        <strong className="me-auto">{title}</strong>
        <small>{id}</small>
      </Toast.Header>
      <Toast.Body className={color}>{content}</Toast.Body>
    </Toast>
  );
};

export default DSToast;
