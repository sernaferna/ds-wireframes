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
  className:
    'order-last col-12 order-sm-last col-sm-12 order-md-last col-sm-12 order-lg-first col-lg-3 order-xl-first col-xl-3 order-xxl-first col-xxl-2',
}))``;

export const PageMainContentCol = styled(Col).attrs(() => ({
  className: 'col-12 col-lg-9 col-xxl-10',
}))``;
