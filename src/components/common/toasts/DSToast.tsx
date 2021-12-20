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
  let bodyStyles = 'bg-opacity-50 fw-bold ';
  let headingStyles = '';

  switch (type) {
    case ToastType.Info:
      toastIcon = <InfoCircleFill className="me-1 text-info" />;
      bodyStyles += 'bg-info text-dark';
      headingStyles += 'bg-info text-white';
      break;
    case ToastType.Danger:
      toastIcon = <ExclamationDiamondFill className="me-1 text-danger" />;
      bodyStyles += 'bg-danger text-dark';
      headingStyles += 'bg-danger text-white';
      break;
    case ToastType.Dark:
      toastIcon = <InfoCircleFill className="me-1 text-dark" />;
      bodyStyles += 'bg-dark text-light';
      headingStyles += 'bg-dark text-light';
      break;
    case ToastType.Light:
      toastIcon = <InfoCircleFill className="me-1 text-default" />;
      bodyStyles += 'bg-light text-dark';
      headingStyles += 'bg-light text-dark';
      break;
    case ToastType.Primary:
      toastIcon = <InfoCircleFill className="me-1 text-primary" />;
      bodyStyles += 'bg-primary text-dark';
      headingStyles += 'bg-primary text-white';
      break;
    case ToastType.Secondary:
      toastIcon = <InfoCircleFill className="me-1 text-secondary" />;
      bodyStyles += 'bg-secondary text-dark';
      headingStyles += 'bg-secondary text-white';
      break;
    case ToastType.Success:
      toastIcon = <CheckSquareFill className="me-1 text-success" />;
      bodyStyles += 'bg-success text-dark';
      headingStyles += 'bg-success text-white';
      break;
    case ToastType.Warning:
      toastIcon = <ExclamationDiamondFill className="me-1 text-warning" />;
      bodyStyles += 'bg-warning text-dark';
      headingStyles += 'bg-warning text-white';
      break;
    default:
      toastIcon = <InfoCircleFill className="me-1 text-default" />;
      bodyStyles += 'text-normal';
      headingStyles += 'text-normal';
  }

  return (
    <Toast autohide delay={duration}>
      <Toast.Header className={headingStyles}>
        {toastIcon}
        <strong className="me-auto">{title}</strong>
        <small>{id}</small>
      </Toast.Header>
      <Toast.Body className={bodyStyles}>{content}</Toast.Body>
    </Toast>
  );
};

export default DSToast;
