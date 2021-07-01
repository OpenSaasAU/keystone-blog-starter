import { Container } from 'react-bootstrap';
import { Footer } from './Footer';
import { Header } from './Header';
import React, { ReactChild } from 'react';

export function Page({ children }: { children: ReactChild }) {
  return (
    <>
      <Header />
      <Container style={{ paddingBottom: '15rem' }}>{children}</Container>
      <Footer />
    </>
  );
}


