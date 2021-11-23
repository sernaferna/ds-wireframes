import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Gear } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Settings } from './Settings';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectShowSettings, showSettingsPanel } from '../../stores/UISlice';
import { useDispatch } from 'react-redux';

const PointerGear = styled(Gear).attrs(() => ({
  className: 'text-light m-0',
}))`
  cursor: pointer;
`;

export function Header() {
  const links = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Prayer',
      href: '/prayer',
    },
    {
      label: 'Read',
      href: '/read',
    },
    {
      label: 'Do',
      href: '/do',
    },
  ].map(({ label, href }) => {
    return (
      <Nav.Link key={href} href={href}>
        {label}
      </Nav.Link>
    );
  });

  const showSettings = useSelector(selectShowSettings);
  const dispatch = useDispatch();

  const toggleSettings = () => {
    dispatch(showSettingsPanel(!showSettings));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="/">
        <Image src="logo192.png" height="50" width="50" />
        <strong className="ms-2">Devouring Scripture</strong>
      </Navbar.Brand>
      <Container className="m-0 w-100">
        <Navbar.Toggle aria-controls="ds-header-navbar" />
        <Navbar.Collapse id="ds-header-navbar">
          <Nav className="m-0">{links}</Nav>
          <Navbar.Text className="w-100 m-0 text-end">
            <PointerGear width="25" height="25" onClick={toggleSettings} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>

      <Offcanvas show={showSettings} onHide={toggleSettings} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Settings />
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
