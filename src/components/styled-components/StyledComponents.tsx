import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

export const SidebarHeading = styled.div.attrs(() => ({
  className: 'bg-primary bg-opacity-25 text-primary h5',
}))`
  cursor: pointer;
`;

export const PageMainContainer = styled(Container).attrs(() => ({
  className: 'm-0 p-1',
  fluid: true,
}))``;
