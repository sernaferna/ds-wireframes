import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

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
