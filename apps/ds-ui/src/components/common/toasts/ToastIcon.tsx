import React, { useMemo } from 'react';
import { ToastType } from './ToastManager';
import { InfoCircleFill, ExclamationDiamondFill, CheckSquareFill } from 'react-bootstrap-icons';

interface IToastIcon {
  type: ToastType;
  className?: string;
}

/**
 * Component to handle the logic for choosing the right icon for a Toast header
 *
 * @param type Type of Toast being displayed, using the ToastType enum
 * @param className CSS class(es) to be used on the icon, defaults to empty string
 */
export const ToastIcon = ({ type, className = '' }: IToastIcon) => {
  const theIcon = useMemo(() => {
    switch (type) {
      case ToastType.Info:
        return <InfoCircleFill className={className} />;
      case ToastType.Danger:
        return <ExclamationDiamondFill className={className} />;
      case ToastType.Dark:
        return <InfoCircleFill className={className} />;
      case ToastType.Light:
        return <InfoCircleFill className={className} />;
      case ToastType.Primary:
        return <InfoCircleFill className={className} />;
      case ToastType.Secondary:
        return <InfoCircleFill className={className} />;
      case ToastType.Success:
        return <CheckSquareFill className={className} />;
      case ToastType.Warning:
        return <ExclamationDiamondFill className={className} />;
      default:
        return <InfoCircleFill className={className} />;
    }
  }, [type, className]);

  return theIcon;
};
