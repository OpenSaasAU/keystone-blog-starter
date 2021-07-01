import { Navbar } from 'react-bootstrap';
import React from 'react';

export function Footer() {


  return (
    <Navbar bg="dark" fixed="bottom" variant="dark">
      <Navbar.Brand>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {' '}
          Thanks for checking out my blog...
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
