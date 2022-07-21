import React from 'react';
import { Collapse } from 'react-bootstrap';

interface ISidebarCollapseWidget {
  title: string;
  visible: boolean;
  clickFunction(): void;
  children: JSX.Element;
}

/**
 * Commonly used widget for sidebars, for a set of content that can be
 * collapsed or shown at the user's desire.
 *
 * @param title Title to be shown in the Collapse title
 * @param visible Whether the content is currently visible
 * @param clickFunction Callback function to be called when the title is clicked
 * @param children The content to be shown within the widget (when visible is true)
 */
export const SidebarCollapseWidget = ({ title, visible, clickFunction, children }: ISidebarCollapseWidget) => (
  <div className="mb-3">
    <div
      className="bg-primary bg-opacity-25 text-primary h5"
      style={{ cursor: 'pointer' }}
      aria-expanded={visible}
      aria-controls="contentDiv"
      onClick={clickFunction}
    >
      {title}
    </div>
    <Collapse in={visible}>
      <div id="contentDiv">{children}</div>
    </Collapse>
  </div>
);
