import ReactDOM from 'react-dom';
import DSToast, { IDSToast } from './DSToast';

interface ToastOptions {
  id?: string;
  title: string;
  content: string;
  duration?: number;
  type?: ToastType;
}

/**
 * Defines the types of Toasts that can be displayed
 */
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

/**
 * Default amount of time for Toasts to remain on the screen
 */
export const TOAST_FADE_TIME = 5000;

/**
 * Used for managing Toasts as they are shown on the screen
 */
export class ToastManager {
  private toasts: IDSToast[] = [];

  /**
   * Constructor to set up the object
   *
   * @param containerRef The div which will be used for showing the Toasts
   */
  constructor(private containerRef: HTMLDivElement) {
    this.containerRef = document.getElementById('main-toast-container') as HTMLDivElement;
  }

  /**
   * Adds a Toast to the list of current Toasts, and renders it to the screen.
   *
   * @param options The settings to be used for this toast (content, title, type, duration)
   */
  public show(options: ToastOptions): void {
    const toastId = Math.random().toString(36).substring(2, 9);
    const toast: IDSToast = {
      id: toastId,
      ...options, // if id is passed within options, it will overwrite the auto-generated one
      destroy: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  /**
   * Removes a Toast from the list of displayed toasts.
   *
   * @param id The ID of the Toast to be removed
   */
  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: IDSToast) => toast.id !== id);
    this.render();
  }

  /**
   * Renders the current list of Toasts (if any) to the screen
   */
  private render(): void {
    const toastsList = this.toasts.map((toastProps: IDSToast) => <DSToast key={toastProps.id} {...toastProps} />);
    ReactDOM.render(toastsList, this.containerRef);
  }
}

/**
 * The singleton ToastManager object. Only interacted with by calling
 * components via the getToastManager() function.
 */
let toastManager: ToastManager | null = null;

/**
 * Gets the ToastManager object, which is a singleton. If it hasn't been
 * instantiate yet, this function takes care of associating it with the
 * appropriate div on the main page.
 *
 * @returns The ToastManager singleton
 */
export const getToastManager = (): ToastManager => {
  if (!toastManager) {
    const containerDiv = document.getElementById('main-toast-container') as HTMLDivElement;
    toastManager = new ToastManager(containerDiv);
  }

  return toastManager;
};
