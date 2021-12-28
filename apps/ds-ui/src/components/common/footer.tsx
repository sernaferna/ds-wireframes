import React from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="fixed-bottom bg-light">
      <Navbar className="container-fluid h-auto">
        <p className="d-none d-sm-block col-md-4 mb-0 text-muted">&copy; 2021 Devouring Scripture</p>
        <NavLink
          to="/"
          className={(isActive) =>
            'nav-link col-md-4 d-flex align-items-center justify-content-center mb-2 mb-md-0 me-md-auto link-dark text-decoration-none' +
            (isActive ? ' active' : '')
          }
        >
          <Image src="logo192.png" height="30" width="30" />
        </NavLink>
        <Nav className="col-md-4 justify-content-end">
          <Nav.Item>
            <NavLink className={(isActive) => 'nav-link text-muted' + (isActive ? ' active' : '')} to="/">
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className={(isActive) => 'nav-link text-muted' + (isActive ? ' active' : '')} to="/faq">
              FAQs
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className={(isActive) => 'nav-link text-muted' + (isActive ? ' active' : '')} to="/about">
              About
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>
    </footer>
  );
}
