import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

interface SideBarHeadingProps {
  collapseDiv: string;
  visible: boolean;
  clickFunction(): void;
}

export const SidebarHeading = styled.div.attrs<SideBarHeadingProps>(({ collapseDiv, visible, clickFunction }) => ({
  className: 'bg-primary bg-opacity-25 text-primary h5',
  'aria-controls': collapseDiv,
  'aria-expanded': visible,
  onClick: clickFunction,
}))<SideBarHeadingProps>`
  cursor: pointer;
`;

export const PageMainContainer = styled(Container).attrs(() => ({
  className: 'm-0 p-1',
  fluid: true,
}))``;
