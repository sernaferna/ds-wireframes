import React from 'react';
import { Collapse } from 'react-bootstrap';

interface ISidebarCollapseWidget {
  title: string;
  visible: boolean;
  clickFunction(): void;
  children: JSX.Element;
}
export const SidebarCollapseWidget = ({ title, visible, clickFunction, children }: ISidebarCollapseWidget) => (
  <div className="sidebar-collapse-widget">
    <div className="header-div" aria-expanded={visible} aria-controls="contentDiv" onClick={clickFunction}>
      {title}
    </div>
    <Collapse in={visible}>
      <div id="contentDiv">{children}</div>
    </Collapse>
  </div>
);
