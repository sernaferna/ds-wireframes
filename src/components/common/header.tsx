import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export class Header extends React.Component {
  links = [
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

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand href="/">
          <Image src="logo192.png" height="50" width="50" />
          <strong className="ms-2">Devouring Scripture</strong>
        </Navbar.Brand>
        <Container className="m-0">
          <Navbar.Toggle aria-controls="ds-header-navbar" />
          <Navbar.Collapse id="ds-header-navbar">
            <Nav className="me-auto">{this.links}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
