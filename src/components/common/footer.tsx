import React from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <Navbar className="fixed-bottom container-fluid" variant="dark">
      <p className="d-none d-sm-block col-md-4 mb-0 text-muted">&copy; 2021 Devouring Scripture</p>
      <NavLink
        to="/"
        activeClassName="active"
        className="nav-link col-md-4 d-flex align-items-center justify-content-center mb-2 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <Image src="logo192.png" height="30" width="30" />
      </NavLink>
      <Nav className="col-md-4 justify-content-end">
        <Nav.Item>
          <NavLink activeClassName="active" className="nav-link text-muted" to="/">
            Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link text-muted" to="/faq" activeClassName="active">
            FAQs
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link text-muted" activeClassName="active" to="/about">
            About
          </NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
