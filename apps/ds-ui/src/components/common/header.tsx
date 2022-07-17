import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LoadingMessage, ErrorLoadingDataMessage } from './loading';
import { useUserSettings } from '../../hooks/UserSettings';

/**
 * Set of links to be displayed across the top of the header
 */
const links = [
  { label: 'Home', href: '/' },
  { label: 'Pray', href: '/prayer' },
  { label: 'Read', href: '/read' },
  { label: 'Do', href: '/do' },
  { label: 'Write', href: '/write' },
  { label: 'Plans', href: '/plans' },
  { label: 'Stats', href: '/stats' },
].map(({ label, href }) => {
  return (
    <NavLink key={href} className="nav-link" to={href}>
      {label}
    </NavLink>
  );
});

/**
 * Set of links to be displayed for Admin users
 */
const adminLinks = [].map(({ label, href }) => {
  return (
    <NavLink key={href} className="nav-link" to={href}>
      {label}
    </NavLink>
  );
});

/**
 * Header displayed at the top of the application
 */
export const Header = () => {
  const [userData, userResponseError, userLoading] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <Navbar id="header-navbar" expand="md">
      <Navbar.Brand href="/">
        <Image src="/logo192.png" height="50" width="50" />
        <strong>Devouring Scripture</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="ds-header-navbar" />
      <Container fluid>
        <Navbar.Collapse id="ds-header-navbar">
          <Nav>
            {links}
            {userData!.isAdmin ? adminLinks : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
