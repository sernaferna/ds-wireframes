import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowSettings, showSettingsPanel } from '../../stores/UISlice';
import { Button, Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LoadingMessage, ErrorLoadingDataMessage } from './loading';
import { useUserSettings } from '../../hooks/UserSettings';
import { Gear } from 'react-bootstrap-icons';
import { Settings } from './Settings';

/**
 * Mini interface for defining links to show up in the header
 */
interface HeaderLink {
  label: string;
  href: string;
}

/**
 * Helper function used to map arrays of link objects to links for the header.
 *
 * @param link The link to be rendered
 * @returns A `NavLink` component
 */
const getLinks = (link: HeaderLink) => {
  return (
    <NavLink key={link.href} className="nav-link" to={link.href}>
      {link.label}
    </NavLink>
  );
};

const links = [
  { label: 'Home', href: '/' },
  { label: 'Pray', href: '/prayer' },
  { label: 'Read/Write', href: '/read' },
  { label: 'Do', href: '/do' },
  { label: 'Plans', href: '/plans' },
  { label: 'Stats', href: '/stats' },
].map(getLinks);

const adminLinks = [{ label: 'Content', href: '/admin/content' }].map(getLinks);

/**
 * Header displayed at the top of the application
 */
export const Header = () => {
  const showSettings = useSelector(selectShowSettings);
  const dispatch = useDispatch();
  const [userData, userResponseError, userLoading] = useUserSettings();

  const toggleSettings = useCallback(() => {
    dispatch(showSettingsPanel(!showSettings));
  }, [showSettings, dispatch]);

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <Navbar variant="dark" bg="dark" expand="md">
      <Navbar.Brand href="/">
        <Image src="/logo192.png" height="50" width="50" />
        <strong className="ms-2">Devouring Scripture</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="ds-header-navbar" />
      <Container fluid>
        <Navbar.Collapse id="ds-header-navbar">
          <Nav>
            {links}
            {userData!.isAdmin && adminLinks}
          </Nav>
          <Navbar.Text className="w-100 text-end">
            <Button variant="dark" onClick={toggleSettings}>
              <Gear width="25" height="25" />
            </Button>
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
};
