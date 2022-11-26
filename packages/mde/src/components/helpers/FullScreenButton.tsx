import React from 'react';
import { Button } from 'react-bootstrap';

interface IFullScreenButton {
  isFullScreen: boolean;
  stateSetter(fs: boolean): void;
}
export const FullScreenButton = ({ isFullScreen, stateSetter }: IFullScreenButton) => {
  if (isFullScreen) {
    return (
      <Button variant="link" size="sm" onClick={() => stateSetter(false)}>
        Show Normal View
      </Button>
    );
  } else {
    return (
      <Button variant="link" size="sm" onClick={() => stateSetter(true)}>
        Show Full Screen
      </Button>
    );
  }
};
