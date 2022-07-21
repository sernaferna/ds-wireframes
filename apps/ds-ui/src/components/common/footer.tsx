import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import packageJson from '../../../package.json';

interface INavlinkStyles {
  isActive: boolean;
}
const navlinkStyles = ({ isActive }: INavlinkStyles) => {
  let classes = 'nav-link text-muted';

  if (isActive) {
    classes += ' active';
  }

  return classes;
};

const logoNavlinkStyles = ({ isActive }: INavlinkStyles) => {
  return (
    navlinkStyles({ isActive }) +
    ' col-md-4 d-flex align-items-center justify-content-center mb-2 mb-md-0 me-md-auto link-dark text-decoration-none'
  );
};

/**
 * Footer component for the application
 */
export const Footer = () => {
  return (
    <footer className="fixed-bottom bg-light">
      <Navbar className="container-fluid h-auto">
        <div className="d-none d-sm-block col-md-4 mb-0 text-muted">
          &copy; 2021 Devouring Scripture, v{packageJson.version}
        </div>
        <NavLink to="/" className={logoNavlinkStyles}>
          <Image src="/logo192.png" height="30" width="30" />
        </NavLink>
        <Nav className="col-md-4 justify-content-end">
          <Nav.Item>
            <NavLink className={navlinkStyles} to="/">
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className={navlinkStyles} to="/help">
              About
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>
    </footer>
  );
};
