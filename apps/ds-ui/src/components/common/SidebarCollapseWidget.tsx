import React from 'react';
import Collapse from 'react-bootstrap/Collapse';

interface SidebarCollapseWidgetParams {
  title: string;
  visible: boolean;
  clickFunction(): void;
  children: JSX.Element;
}
export const SidebarCollapseWidget = ({ title, visible, clickFunction, children }: SidebarCollapseWidgetParams) => (
  <div className="sidebar-collapse-widget">
    <div className="header-div" aria-expanded={visible} aria-controls="contentDiv" onClick={clickFunction}>
      {title}
    </div>
    <Collapse in={visible}>
      <div id="contentDiv">{children}</div>
    </Collapse>
  </div>
);
