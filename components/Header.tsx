import { Navbar, Row, Col, Image, NavLink } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';


export function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <NavLink><Link href="/">Home</Link></NavLink>
      </Navbar.Brand>
    </Navbar>
  )
}
