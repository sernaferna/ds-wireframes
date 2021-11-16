import React from 'react';
import styled from 'styled-components';
import Collapse from 'react-bootstrap/Collapse';

interface HeaderDivParams {
  visible: boolean;
  clickFunction(): void;
}
const HeaderDiv = styled.div.attrs<HeaderDivParams>(({ visible, clickFunction }) => ({
  className: 'bg-primary bg-opacity-25 text-primary h5',
  'aria-expanded': visible,
  onClick: clickFunction,
}))<HeaderDivParams>`
  cursor: pointer;
`;

interface SidebarCollapseWidgetParams {
  title: string;
  visible: boolean;
  clickFunction(): void;
  children: JSX.Element;
}

export const SidebarCollapseWidget = ({ title, visible, clickFunction, children }: SidebarCollapseWidgetParams) => (
  <div>
    <HeaderDiv visible={visible} aria-controls="contentDiv" clickFunction={clickFunction}>
      {title}
    </HeaderDiv>
    <Collapse in={visible}>
      <div id="contentDiv">{children}</div>
    </Collapse>
  </div>
);
