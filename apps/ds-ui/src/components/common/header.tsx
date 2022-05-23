import React, { useCallback } from 'react';
import { Offcanvas, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';
import { Settings } from './Settings';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowSettings, showSettingsPanel } from '../../stores/UISlice';
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
  const showSettings = useSelector(selectShowSettings);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);

  const toggleSettings = useCallback(() => {
    dispatch(showSettingsPanel(!showSettings));
  }, [showSettings, dispatch]);

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
          <Navbar.Text>
            <Gear width="25" height="25" onClick={toggleSettings} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>

      <Offcanvas show={showSettings} onHide={toggleSettings} placement="end" aria-labelledby="settingspaneTitle">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="settingspaneTitle">Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Settings />
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
