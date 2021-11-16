import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const PageMainContainer = styled(Container).attrs(() => ({
  className: 'm-0 p-1',
  fluid: true,
}))``;

export const PageMainRow = styled(Row).attrs(() => ({}))``;

export const PageSidebarContainerCol = styled(Col).attrs(() => ({
  xs: 2,
}))``;

export const PageMainContentCol = styled(Col).attrs(() => ({
  xs: 10,
}))``;
