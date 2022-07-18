import { useState, useEffect } from 'react';

/**
 * Enum for the different Bootstrap display sizes; because this is an
 * enum, comparisons should be possible. (e.g. `BSWindowSize.LG >
 * BSWindowSize.SM`).
 */
export enum BSWindowSize {
  XS = 1,
  SM = 2,
  MD = 3,
  LG = 4,
  XL = 5,
  XXL = 6,
}

/**
 * Helper function to get a Bootstrap-friendly size
 *
 * @param width The width of the display in pixels
 * @returns A `BSWindowSize` size indicator
 */
const getBSWidthForNum = (width: number): BSWindowSize => {
  if (width < 576) {
    return BSWindowSize.XS;
  }
  if (width < 768) {
    return BSWindowSize.SM;
  }
  if (width < 992) {
    return BSWindowSize.MD;
  }
  if (width < 1200) {
    return BSWindowSize.LG;
  }
  if (width < 1400) {
    return BSWindowSize.XL;
  }

  return BSWindowSize.XXL;
};

/**
 * Returned from the `useWindowSize` hook to indicate the window size
 */
export interface WindowSize {
  width: number;
  height: number;
  bswidth: BSWindowSize;
}

/**
 * Hook to get the window size, for cases where the Bootstrap classes
 * can't quite do everything.
 *
 * @returns The size of the window (object containing width and height)
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 1,
    height: 1,
    bswidth: BSWindowSize.XS,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        bswidth: getBSWidthForNum(window.innerWidth),
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
