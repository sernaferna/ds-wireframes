import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export class Footer extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light" className="footer align-middle">
        <Navbar.Brand>
          <strong>Devouring Scripture</strong>
        </Navbar.Brand>
        <Nav>
          <Nav.Item>&copy; 2021 sernaferna</Nav.Item>
          <Nav.Link key="/help" href="/help">
            Help
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
