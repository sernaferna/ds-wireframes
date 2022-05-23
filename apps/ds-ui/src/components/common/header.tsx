import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from './loading';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Pray', href: '/prayer' },
  { label: 'Read', href: '/read' },
  { label: 'Do', href: '/do' },
  { label: 'Plans', href: '/plans' },
  { label: 'Stats', href: '/stats' },
].map(({ label, href }) => {
  return (
    <NavLink key={href} className="nav-link" to={href}>
      {label}
    </NavLink>
  );
});

const adminLinks = [].map(({ label, href }) => {
  return (
    <NavLink key={href} className="nav-link" to={href}>
      {label}
    </NavLink>
  );
});

export function Header() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <Navbar id="header-navbar" expand="sm">
      <Navbar.Brand href="/">
        <Image src="/logo192.png" height="50" width="50" />
        <strong>Devouring Scripture</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="ds-header-navbar" />
      <Container fluid>
        <Navbar.Collapse id="ds-header-navbar">
          <Nav>
            {links}
            {data!.isAdmin ? adminLinks : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
