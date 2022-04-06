import ReactDOM from 'react-dom';
import DSToast, { IDSToast } from './DSToast';

interface ToastOptions {
  id?: string;
  title: string;
  content: string;
  duration?: number;
  type?: ToastType;
}

export enum ToastType {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Warning = 5,
  Info = 6,
  Light = 7,
  Dark = 8,
  None = 9,
}

export const TOAST_FADE_TIME = 5000;

export class ToastManager {
  private toasts: IDSToast[] = [];

  constructor(private containerRef: HTMLDivElement) {
    this.containerRef = document.getElementById('main-toast-container') as HTMLDivElement;
  }

  public show(options: ToastOptions): void {
    const toastId = Math.random().toString(36).substr(2, 9);
    const toast: IDSToast = {
      id: toastId,
      ...options, // if id is passed within options, it will overwrite the auto-generated one
      destroy: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: IDSToast) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: IDSToast) => <DSToast key={toastProps.id} {...toastProps} />);
    ReactDOM.render(toastsList, this.containerRef);
  }
}

let toastManager: ToastManager | null = null;

export const getToastManager = (): ToastManager => {
  if (!toastManager) {
    const containerDiv = document.getElementById('main-toast-container') as HTMLDivElement;
    toastManager = new ToastManager(containerDiv);
  }

  return toastManager;
};
